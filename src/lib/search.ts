import { FOOTER_COLUMNS, MAIN_NAV, MOBILE_MENU_GROUPS, type NavLink } from "@/content/navigation";

export interface SearchEntry extends NavLink {
  section: string;
}

/** Site-wide link index built from the navigation content. Grows as pages add content. */
export function buildSearchIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];
  const add = (section: string, links: NavLink[]) =>
    links.forEach((l) => entries.push({ ...l, section }));

  for (const item of MAIN_NAV) {
    if (item.kind === "link") add(item.label, [item]);
    else if (item.kind === "links") item.groups.forEach((g) => add(item.label, g.links));
    else add(item.label, [{ label: item.feature.title, href: item.feature.cta.href, description: item.feature.text }]);
  }
  MOBILE_MENU_GROUPS.forEach((g) => add(g.title, g.links));
  FOOTER_COLUMNS.forEach((g) => add(g.title, g.links));

  // One entry per destination, keeping the first (most descriptive) one.
  const seen = new Set<string>();
  return entries.filter((e) => (seen.has(e.href) ? false : (seen.add(e.href), true)));
}

export function searchSite(query: string, index: SearchEntry[] = buildSearchIndex()): SearchEntry[] {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];
  return index.filter((e) => {
    const haystack = `${e.label} ${e.description ?? ""} ${e.section}`.toLowerCase();
    return terms.every((t) => haystack.includes(t));
  });
}
