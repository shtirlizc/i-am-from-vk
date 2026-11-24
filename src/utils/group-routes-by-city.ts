interface RouteWithCity {
  id: string;
  data: { city: string };
}

export function groupRoutesByCity<T extends RouteWithCity>(
  routes: readonly T[],
): T[] {
  const cities = new Map<string, T[]>();

  // Keep the existing city order, but place each city's stories together.
  for (const route of [...routes].sort((a, b) =>
    a.id.localeCompare(b.id, undefined, { numeric: true }),
  )) {
    const group = cities.get(route.data.city);
    if (group) {
      group.push(route);
    } else {
      cities.set(route.data.city, [route]);
    }
  }

  return Array.from(cities.values()).flat();
}
