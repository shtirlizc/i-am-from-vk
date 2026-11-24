import assert from "node:assert/strict";
import test from "node:test";
import { groupRoutesByCity } from "../src/utils/group-routes-by-city.ts";

const route = (number, city) => ({
  id: `route-marker-${String(number).padStart(2, "0")}`,
  data: { city },
});

test("stories from the same city are consecutive, preserving city and author order", () => {
  const entries = [
    route(15, "Москва"),
    route(3, "Воронеж"),
    route(16, "Пермь"),
    route(8, "Москва"),
    route(1, "Пермь"),
    route(4, "Москва"),
    route(14, "Воронеж"),
    route(2, "Москва"),
  ];
  const result = groupRoutesByCity(entries);
  assert.deepEqual(
    result.map(({ id }) => id),
    [1, 16, 2, 4, 8, 15, 3, 14].map((number) => route(number, "").id),
  );
  assert.equal(entries[0].id, "route-marker-15");
});

test("collection input order does not change the navigation order", () => {
  const entries = [
    route(1, "Пермь"),
    route(2, "Москва"),
    route(3, "Воронеж"),
    route(4, "Москва"),
  ];
  assert.deepEqual(
    groupRoutesByCity(entries),
    groupRoutesByCity([...entries].reverse()),
  );
});
