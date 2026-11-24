import assert from "node:assert/strict";
import test from "node:test";
import {
  getPopoverArea,
  getPopoverPosition,
} from "../src/components/routes-popover-position.ts";

const viewport = { left: 0, top: 0, right: 1440, bottom: 900 };
const rect = (left, top, width, height) => ({
  left,
  top,
  right: left + width,
  bottom: top + height,
});

test("usable area stays inside both the map and the viewport with a 16px inset", () => {
  assert.deepEqual(
    getPopoverArea(rect(-100, -200, 900, 700), rect(0, 0, 600, 400)),
    { left: 16, top: 16, right: 584, bottom: 384, width: 568, height: 368 },
  );
  assert.deepEqual(getPopoverArea(rect(200, 100, 800, 600), viewport), {
    left: 216,
    top: 116,
    right: 984,
    bottom: 684,
    width: 768,
    height: 568,
  });
});

test("no area is available when the map is offscreen or smaller than its insets", () => {
  assert.equal(getPopoverArea(rect(1500, 0, 500, 500), viewport), null);
  assert.equal(getPopoverArea(rect(0, -500, 500, 400), viewport), null);
  assert.equal(getPopoverArea(rect(0, 0, 32, 100), viewport), null);
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
    const area = getPopoverArea(map, viewport);
    const position = getPopoverPosition(marker, area, {
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

test("cards constrained to small visible map fragments remain fully inside", () => {
  const area = getPopoverArea(rect(0, 0, 320, 80), viewport);
  const position = getPopoverPosition(rect(150, 30, 28, 28), area, {
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
    const area = getPopoverArea(map, viewport);
    if (!area) continue;

    checked++;
    const size = {
      width: Math.min(340, area.width),
      height: Math.min(60 + random() * 500, area.height),
    };
    const marker = rect(
      map.left + random() * (map.right - map.left - 28),
      map.top + random() * (map.bottom - map.top - 28),
      28,
      28,
    );
    const position = getPopoverPosition(marker, area, size);
    assert.ok(position.left >= area.left);
    assert.ok(position.top >= area.top);
    assert.ok(position.left + size.width <= area.right);
    assert.ok(position.top + size.height <= area.bottom);
  }
  assert.ok(checked >= 450);
});
