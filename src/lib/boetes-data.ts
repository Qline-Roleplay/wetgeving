import boetetabelJson from '../../data/boetetabel.json';

export type BoeteValue =
  | { kind: 'bedrag'; bedrag: number; note?: string }
  | { kind: 'bereik'; min: number; max: number; note?: string };

export type BoeteCategorie = 'verkeer' | 'openbare-orde';

export interface BoeteEntry {
  id: string;
  overtreding: string;
  categorie: BoeteCategorie;
  bedrag: BoeteValue;
}

// Eén bron van waarheid voor zowel de boetetabel als de boetecalculator.
// De data zelf staat in data/boetetabel.json (schema: schema/boetetabel.schema.json,
// gecontroleerd via `npm run validate:data`) — pas de JSON aan, niet dit bestand.
export const BOETES_ENTRIES: BoeteEntry[] = boetetabelJson as BoeteEntry[];

// Uses the range's minimum as the representative value for sorting.
export function boeteSortValue(bedrag: BoeteValue): number {
  return bedrag.kind === 'bedrag' ? bedrag.bedrag : bedrag.min;
}

export function formatBoete(bedrag: BoeteValue): string {
  const bedragText =
    bedrag.kind === 'bedrag' ? `€${bedrag.bedrag}` : `€${bedrag.min} – €${bedrag.max}`;
  return bedrag.note ? `${bedragText} (${bedrag.note})` : bedragText;
}
