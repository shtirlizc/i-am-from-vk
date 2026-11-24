import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { dirname } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { runInNewContext } from "node:vm";
import { build } from "esbuild";

const points = (
  await readdir(new URL("../src/content/routes/", import.meta.url), {
    withFileTypes: true,
  })
)
  .filter((entry) => entry.isDirectory())
  .map((entry) => ({ id: entry.name }))
  .sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));

const componentPath = fileURLToPath(
  new URL("../src/components/routes-card.astro", import.meta.url),
);
const component = await readFile(componentPath, "utf8");
const script = component.match(/<script>([\s\S]*?)<\/script>/)[1];
const { outputFiles } = await build({
  stdin: {
    contents: script,
    loader: "ts",
    resolveDir: dirname(componentPath),
  },
  bundle: true,
  write: false,
  platform: "browser",
  format: "iife",
});

const rect = (left, top, width, height) => ({
  left,
  top,
  right: left + width,
  bottom: top + height,
});

// Run the real component script with only browser layout APIs substituted.
function createMap({
  entries = points,
  offscreen = false,
  reverseMarkers = false,
} = {}) {
  const document = new EventTarget();
  document.activeElement = {};
  document.documentElement = { clientWidth: 1440 };

  class Element extends EventTarget {
    constructor(id) {
      super();
      this.id = id;
      this.attributes = new Map();
      this.style = {
        setProperty(name, value) {
          this[name] = value;
        },
        removeProperty(name) {
          delete this[name];
        },
      };
      this.replacements = 0;
      this.scrollTop = 0;
      this.disabled = false;
      this.animations = [];
    }
    setAttribute(name, value) {
      this.attributes.set(name, value);
    }
    getAttribute(name) {
      return this.attributes.get(name) ?? null;
    }
    replaceChildren(content) {
      this.contentId = content.pointId;
      this.replacements++;
    }
    focus(options) {
      assert.equal(options?.preventScroll, true);
      document.activeElement = this;
    }
    animate(keyframes, options) {
      const animation = {
        keyframes,
        options,
        cancelled: false,
        cancel() {
          this.cancelled = true;
        },
      };
      this.animations.push(animation);
      return animation;
    }
    click() {
      this.dispatchEvent(new Event("click"));
    }
  }

  const map = new Element("map");
  map.bounds = rect(100, offscreen ? 1200 : 100, 1160, 587);
  map.getBoundingClientRect = () => map.bounds;
  const markers = entries.map((point, index) => {
    const marker = new Element(point.id);
    marker.getBoundingClientRect = () =>
      marker.bounds ??
      rect(
        map.bounds.left + 50 + index * 75,
        map.bounds.top + 100 + (index % 3) * 50,
        28,
        28,
      );
    return marker;
  });
  const templates = entries.map((point) => ({
    dataset: { pointId: point.id },
    content: { cloneNode: () => ({ pointId: point.id }) },
  }));
  const previous = new Element("previous");
  const next = new Element("next");
  const card = new Element("routes-card");
  const routes = {
    querySelectorAll(selector) {
      assert.equal(selector, "template[data-point-id]");
      return templates;
    },
    querySelector(selector) {
      return { "[data-route-prev]": previous, "[data-route-next]": next }[
        selector
      ];
    },
  };
  card.closest = (selector) => (selector === ".routes__map" ? map : null);
  map.closest = (selector) => (selector === "#routes" ? routes : null);
  map.querySelectorAll = (selector) => {
    assert.equal(selector, ".route-marker");
    return reverseMarkers ? [...markers].reverse() : markers;
  };
  document.querySelector = (selector) =>
    selector === "#routes-card" ? card : null;

  const window = new EventTarget();
  window.innerHeight = 900;
  window.scrollTo = () => assert.fail("Navigation must not scroll the page");
  const observers = [];
  class ResizeObserver {
    constructor(callback) {
      observers.push(callback);
    }
    observe() {}
  }
  runInNewContext(outputFiles[0].text, {
    document,
    window,
    ResizeObserver,
    getComputedStyle(element) {
      return {
        width: `${Math.min(340, Number.parseFloat(element.style.maxWidth))}px`,
        height: `${Math.min(240, Number.parseFloat(element.style.maxHeight))}px`,
        getPropertyValue(name) {
          assert.equal(name, "--transition");
          return "0.2s";
        },
      };
    },
  });

  return {
    document,
    window,
    map,
    markers,
    previous,
    next,
    card,
    resize: () => observers.forEach((callback) => callback()),
    selected: () =>
      markers
        .filter((marker) => marker.getAttribute("aria-pressed") === "true")
        .map((marker) => marker.id),
  };
}

const key = (target, type, value, repeat = false) => {
  const event = new Event(type, { cancelable: true });
  Object.defineProperties(event, {
    key: { value },
    repeat: { value: repeat },
  });
  target.dispatchEvent(event);
};

test("the first point is selected and animated without moving keyboard focus", () => {
  const fixture = createMap();
  assert.equal(fixture.card.contentId, points[0].id);
  assert.deepEqual(fixture.selected(), [points[0].id]);
  assert.notEqual(fixture.document.activeElement, fixture.card);
});

test("next and previous wrap around both ends of the points list", () => {
  const { next, previous, card } = createMap();
  next.click();
  assert.equal(card.contentId, points[1].id);
  previous.click();
  assert.equal(card.contentId, points[0].id);
  previous.click();
  assert.equal(card.contentId, points.at(-1).id);
  next.click();
  assert.equal(card.contentId, points[0].id);
});

test("navigation follows data order even when SVG markers are in a different order", () => {
  const { next, card } = createMap({ reverseMarkers: true });
  next.click();
  assert.equal(card.contentId, points[1].id);
});

test("modal selection updates the map and subsequent navigation without moving focus", () => {
  const fixture = createMap();
  const focus = fixture.document.activeElement;
  fixture.document.dispatchEvent(
    new CustomEvent("route:select", { detail: points[4].id }),
  );
  assert.equal(fixture.card.contentId, points[4].id);
  assert.deepEqual(fixture.selected(), [points[4].id]);
  assert.equal(fixture.document.activeElement, focus);
  fixture.next.click();
  assert.equal(fixture.card.contentId, points[5].id);
});

test("clicking a marker changes the current point for subsequent navigation", () => {
  const fixture = createMap();
  fixture.markers[6].click();
  assert.equal(fixture.card.contentId, points[6].id);
  fixture.next.click();
  assert.equal(fixture.card.contentId, points[7].id);
  fixture.previous.click();
  assert.equal(fixture.card.contentId, points[6].id);
  assert.deepEqual(fixture.selected(), [points[6].id]);
});

test("repeated marker clicks, outside clicks and Escape keep the current card content", () => {
  const fixture = createMap();
  const replacements = fixture.card.replacements;
  fixture.card.scrollTop = 40;
  fixture.markers[0].click();
  fixture.document.dispatchEvent(new Event("click"));
  key(fixture.document, "keydown", "Escape");
  assert.equal(fixture.card.replacements, replacements);
  assert.equal(fixture.card.scrollTop, 40);
});

test("the card remains mounted and keeps local coordinates while the page scrolls", () => {
  const fixture = createMap({ offscreen: true });
  assert.equal(fixture.card.contentId, points[0].id);
  assert.deepEqual(fixture.selected(), [points[0].id]);
  const { left, top, maxHeight } = fixture.card.style;
  const replacements = fixture.card.replacements;
  for (const mapTop of [700, 100, -16, -700, 1200]) {
    fixture.map.bounds = rect(100, mapTop, 1160, 587);
    fixture.window.dispatchEvent(new Event("scroll"));
    fixture.resize();
    assert.equal(fixture.card.style.left, left);
    assert.equal(fixture.card.style.top, top);
    assert.equal(fixture.card.style.maxHeight, maxHeight);
    assert.equal(fixture.card.style.visibility, undefined);
    assert.equal(fixture.card.replacements, replacements);
    assert.deepEqual(fixture.selected(), [points[0].id]);
  }
  fixture.next.click();
  assert.equal(fixture.card.contentId, points[1].id);
  assert.deepEqual(fixture.selected(), [points[1].id]);
});

test("navigation positions an offscreen marker's card inside the map", () => {
  const fixture = createMap();
  fixture.markers[1].bounds = rect(1800, 200, 28, 28);
  fixture.document.activeElement = fixture.next;
  fixture.next.click();
  assert.equal(fixture.card.contentId, points[1].id);
  assert.equal(fixture.document.activeElement, fixture.next);
  const left = Number.parseFloat(fixture.card.style.left);
  const top = Number.parseFloat(fixture.card.style.top);
  assert.ok(left >= 16 && left + 340 <= 1144);
  assert.ok(top >= 16 && top + 240 <= 571);
});

test("Enter and Space select markers and focus the card without scrolling", () => {
  const fixture = createMap();
  key(fixture.markers[3], "keydown", "Enter");
  assert.equal(fixture.card.contentId, points[3].id);
  assert.equal(fixture.document.activeElement, fixture.card);
  key(fixture.markers[8], "keydown", " ");
  assert.equal(fixture.card.contentId, points[3].id);
  key(fixture.markers[8], "keyup", " ");
  assert.equal(fixture.card.contentId, points[8].id);
});

test("empty and single-point lists disable navigation without errors", () => {
  for (const entries of [[], points.slice(0, 1)]) {
    const fixture = createMap({ entries });
    assert.equal(fixture.previous.disabled, true);
    assert.equal(fixture.next.disabled, true);
    fixture.next.click();
    fixture.previous.click();
    assert.equal(fixture.card.contentId, entries[0]?.id);
  }
});

test("narrow screens can navigate to cards for markers outside the visible map", () => {
  const fixture = createMap();
  fixture.document.documentElement.clientWidth = 320;
  fixture.resize();
  fixture.previous.click();
  assert.equal(fixture.card.contentId, points.at(-1).id);
  const left = Number.parseFloat(fixture.card.style.left);
  const width = Number.parseFloat(fixture.card.style.maxWidth);
  assert.ok(left >= 16 && left + width <= 204);
});

test("changing a visible card animates it and cancels the previous change", () => {
  const fixture = createMap();
  fixture.next.click();
  const firstAnimation = fixture.card.animations.at(-1);
  assert.equal(firstAnimation.options.duration, 200);
  assert.equal(firstAnimation.keyframes[0].opacity, 0);
  assert.equal(firstAnimation.keyframes.at(-1).opacity, 1);
  fixture.markers[4].click();
  assert.equal(firstAnimation.cancelled, true);
  assert.equal(fixture.card.animations.length, 3);
  assert.equal(fixture.card.contentId, points[4].id);
  fixture.markers[4].click();
  assert.equal(fixture.card.animations.length, 3);
  fixture.map.bounds = rect(100, -700, 1160, 587);
  fixture.window.dispatchEvent(new Event("scroll"));
  assert.equal(fixture.card.animations.at(-1).cancelled, false);
});

test("rapid navigation keeps only the latest card animation active", () => {
  const fixture = createMap();
  for (let index = 0; index < 25; index++) fixture.next.click();
  assert.equal(fixture.card.contentId, points[25 % points.length].id);
  assert.equal(fixture.card.animations.length, 26);
  assert.equal(
    fixture.card.animations.filter((animation) => !animation.cancelled).length,
    1,
  );
});
