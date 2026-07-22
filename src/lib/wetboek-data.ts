import wetboekJson from '../../data/wetboek.json';

export type WetKey = 'bw' | 'opw' | 'gw' | 'wvw' | 'wwm' | 'sr';

export const WETTEN: Record<WetKey, string> = {
  bw: 'Burgerlijk Wetboek (BW.)',
  opw: 'Opiumwet (Opw.)',
  gw: 'Gemeentewet Qline (GW.)',
  wvw: 'Wegenverkeerswet (WVW.)',
  wwm: 'Wet Wapens en Munitie (WWM.)',
  sr: 'Wetboek van Strafrecht (Sr.)',
};

// Welke /wetboek/... pagina elke wet rendert — gebruikt om stabiele
// kruisverwijzingen (bijv. vanuit de APV) naar een specifieke rij te bouwen.
export const WET_SLUGS: Record<WetKey, string> = {
  bw: '/wetboek/burgerlijk-wetboek',
  opw: '/wetboek/opiumwet',
  gw: '/wetboek/gemeentewet',
  wvw: '/wetboek/wegenverkeerswet',
  wwm: '/wetboek/wet-wapens-en-munitie',
  sr: '/wetboek/wetboek-van-strafrecht',
};

export type StrafValue =
  | { kind: 'maanden'; maanden: number }
  | { kind: 'taken'; taken: number }
  // Agent kiest tussen een vast aantal maanden of taken. Is `taken` niet
  // gegeven, dan is het aantal taken niet vastgelegd en vult de agent dit
  // zelf in bij het gebruik van de calculator.
  | { kind: 'keuze'; maanden: number; taken?: number }
  // Vermenigvuldigingsfactor die pas een concreet aantal maanden oplevert
  // zodra de agent een waarde invult (bijv. het aantal openstaande boetes).
  | { kind: 'factor'; label: string; factor: number; inputLabel: string };

export interface StrafEntry {
  id: string;
  feit: string;
  wet: WetKey;
  artikel: string;
  straf: StrafValue;
}

// Eén bron van waarheid voor zowel de wettabellen als de strafcalculator.
// De data zelf staat in data/wetboek.json (schema: schema/wetboek.schema.json,
// gecontroleerd via `npm run validate:data`) — pas de JSON aan, niet dit bestand.
export const WETBOEK_ENTRIES: StrafEntry[] = wetboekJson as StrafEntry[];

export function formatStraf(straf: StrafValue): string {
  switch (straf.kind) {
    case 'maanden':
      return `${straf.maanden} maanden`;
    case 'taken':
      return `${straf.taken} taken`;
    case 'keuze':
      return straf.taken !== undefined
        ? `${straf.maanden} maanden of ${straf.taken} taken`
        : `${straf.maanden} maanden of taken`;
    case 'factor':
      return straf.label;
  }
}

// Rough severity ballpark for the sortable Strafmaat column — mixes maanden
// and taken on one numeric scale, which isn't a precise equivalence, but is
// good enough for "roughly ascending/descending". Factor entries have no
// fixed number until filled in, so they sort to the end.
export function strafSortValue(straf: StrafValue): number {
  switch (straf.kind) {
    case 'maanden':
      return straf.maanden;
    case 'taken':
      return straf.taken;
    case 'keuze':
      return straf.maanden;
    case 'factor':
      return Number.POSITIVE_INFINITY;
  }
}

const ENTRIES_BY_ID = new Map(WETBOEK_ENTRIES.map((entry) => [entry.id, entry]));

// Deep link to one specific row in a wettabel. Throws at build time (rather
// than silently rendering a dead link) if `id` was renamed or removed — so a
// stale cross-reference fails the build instead of shipping broken.
export function getWetboekEntryHref(id: string): string {
  const entry = ENTRIES_BY_ID.get(id);
  if (!entry) {
    throw new Error(
      `Onbekende wetboek-verwijzing "${id}" — controleer of het id nog bestaat in src/lib/wetboek-data.ts.`,
    );
  }
  // Trailing slash before the hash matches next.config's trailingSlash
  // export so this resolves without an extra redirect hop on GitHub Pages.
  return `${WET_SLUGS[entry.wet]}/#${entry.id}`;
}

export function getWetboekEntryLabel(id: string): string {
  const entry = ENTRIES_BY_ID.get(id);
  if (!entry) {
    throw new Error(
      `Onbekende wetboek-verwijzing "${id}" — controleer of het id nog bestaat in src/lib/wetboek-data.ts.`,
    );
  }
  return entry.feit;
}
