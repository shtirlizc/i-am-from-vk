import assert from "node:assert/strict";
import test from "node:test";
import {
  getCardArea,
  getCardPosition,
} from "../src/components/routes-card-position.ts";

const viewportWidth = 1440;
const rect = (left, top, width, height) => ({
  left,
  top,
  right: left + width,
  bottom: top + height,
});

test("usable area uses local map coordinates and respects horizontal screen clipping", () => {
  assert.deepEqual(getCardArea(rect(-100, -200, 900, 700), 600), {
    left: 116,
    top: 16,
    right: 684,
    bottom: 684,
    width: 568,
    height: 668,
  });
  assert.deepEqual(getCardArea(rect(200, 100, 800, 600), viewportWidth), {
    left: 16,
    top: 16,
    right: 784,
    bottom: 584,
    width: 768,
    height: 568,
  });
});

test("no area is available when the map is horizontally outside the screen or too small", () => {
  assert.equal(getCardArea(rect(1500, 0, 500, 500), viewportWidth), null);
  assert.equal(getCardArea(rect(0, 0, 32, 100), viewportWidth), null);
});

test("vertical page scrolling does not change the card's available area", () => {
  const area = getCardArea(rect(100, 100, 1160, 587), viewportWidth);
  for (const top of [-900, -16, 0, 900, 2000]) {
    assert.deepEqual(
      getCardArea(rect(100, top, 1160, 587), viewportWidth),
      area,
    );
  }
});

for (const { name, map, marker, side } of [
  {
    name: "right is preferred when there is room on both sides",
    map: rect(0, 0, 1160, 600),
    marker: rect(600, 200, 28, 28),
    side: "right",
  },
  {
    name: "left is used near the right edge of the map",
    map: rect(0, 0, 1160, 600),
    marker: rect(1080, 260, 28, 28),
    side: "left",
  },
  {
    name: "top is used when neither side has room",
    map: rect(0, 0, 420, 600),
    marker: rect(196, 400, 28, 28),
    side: "top",
  },
  {
    name: "bottom is used when the sides and top have no room",
    map: rect(0, 0, 420, 600),
    marker: rect(196, 80, 28, 28),
    side: "bottom",
  },
  {
    name: "overlap is allowed only when the card cannot fit beside the marker",
    map: rect(0, 0, 420, 300),
    marker: rect(196, 140, 28, 28),
    side: "overlap",
  },
]) {
  test(name, () => {
    const area = getCardArea(map, viewportWidth);
    const position = getCardPosition(marker, area, {
      width: 340,
      height: 240,
    });
    assert.equal(position.side, side);
    assert.ok(position.left >= area.left);
    assert.ok(position.top >= area.top);
    assert.ok(position.left + 340 <= area.right);
    assert.ok(position.top + 240 <= area.bottom);
  });
}

test("cards constrained to small maps remain fully inside", () => {
  const area = getCardArea(rect(0, 0, 320, 80), viewportWidth);
  const position = getCardPosition(rect(150, 30, 28, 28), area, {
    width: area.width,
    height: area.height,
  });
  assert.equal(position.left, area.left);
  assert.equal(position.top, area.top);
});

test("all placements stay contained for varied map sizes, markers and card sizes", () => {
  let seed = 20261124;
  let checked = 0;
  const random = () => {
    seed = (1664525 * seed + 1013904223) >>> 0;
    return seed / 2 ** 32;
  };

  for (let i = 0; i < 500; i++) {
    const map = rect(
      random() * 100 - 50,
      random() * 100 - 50,
      64 + random() * 1100,
      64 + random() * 700,
    );
    const area = getCardArea(map, viewportWidth);
    if (!area) continue;

    checked++;
    const size = {
      width: Math.min(340, area.width),
      height: Math.min(60 + random() * 500, area.height),
    };
    const marker = rect(
      random() * (map.right - map.left - 28),
      random() * (map.bottom - map.top - 28),
      28,
      28,
    );
    const position = getCardPosition(marker, area, size);
    assert.ok(position.left >= area.left);
    assert.ok(position.top >= area.top);
    assert.ok(position.left + size.width <= area.right);
    assert.ok(position.top + size.height <= area.bottom);
  }
  assert.ok(checked >= 450);
});
