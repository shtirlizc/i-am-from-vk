interface Rect {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

interface Area extends Rect {
  width: number;
  height: number;
}

interface Size {
  width: number;
  height: number;
}

interface Position {
  left: number;
  top: number;
  side: "right" | "left" | "top" | "bottom" | "overlap";
}

export function getCardArea(
  map: Rect,
  viewportWidth: number,
  padding = 16,
): Area | null {
  // Coordinates are local to the map; only horizontal clipping matters.
  const left = Math.ceil(Math.max(0, -map.left) + padding);
  const top = padding;
  const right = Math.floor(
    Math.min(map.right, viewportWidth) - map.left - padding,
  );
  const bottom = Math.floor(map.bottom - map.top - padding);

  if (right <= left || bottom <= top) return null;

  return {
    left,
    top,
    right,
    bottom,
    width: right - left,
    height: bottom - top,
  };
}

export function getCardPosition(
  marker: Rect,
  area: Area,
  size: Size,
  gap = 16,
): Position {
  const clamp = (value: number, min: number, max: number) =>
    Math.max(min, Math.min(value, max));
  const centeredLeft = clamp(
    (marker.left + marker.right - size.width) / 2,
    area.left,
    area.right - size.width,
  );
  const centeredTop = clamp(
    (marker.top + marker.bottom - size.height) / 2,
    area.top,
    area.bottom - size.height,
  );
  const candidates: Position[] = [
    { side: "right", left: marker.right + gap, top: centeredTop },
    { side: "left", left: marker.left - gap - size.width, top: centeredTop },
    { side: "top", left: centeredLeft, top: marker.top - gap - size.height },
    { side: "bottom", left: centeredLeft, top: marker.bottom + gap },
  ];

  return (
    candidates.find(
      ({ left, top }) =>
        left >= area.left &&
        top >= area.top &&
        left + size.width <= area.right &&
        top + size.height <= area.bottom,
    ) ?? {
      side: "overlap",
      left: clamp(marker.right + gap, area.left, area.right - size.width),
      top: centeredTop,
    }
  );
}
