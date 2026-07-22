import kostenJson from '../../data/kosten.json';

export type Geldwaarde =
  | { kind: 'bedrag'; bedrag: number; note?: string }
  | { kind: 'bereik'; min: number; max: number; note?: string };

export type KostenCategorie = 'rijschool' | 'stadhuis' | 'belasting';

export interface DienstEntry {
  id: string;
  type: 'dienst';
  categorie: Exclude<KostenCategorie, 'belasting'>;
  naam: string;
  tarief: Geldwaarde;
  definitief: boolean;
  opmerking?: string;
  laatst_gewijzigd?: string;
}

export interface BelastingTier {
  minAantal: number;
  maxAantal: number | null;
  bedrag: number;
}

export interface BelastingEntry {
  id: string;
  type: 'belasting';
  categorie: 'belasting';
  naam: string;
  eenheid: string;
  tiers: BelastingTier[];
  definitief: boolean;
  opmerking?: string;
  laatst_gewijzigd?: string;
}

export type KostenEntry = DienstEntry | BelastingEntry;

// Eén bron van waarheid voor <KostenTabel />. De data zelf staat in
// data/kosten.json (schema: schema/kosten.schema.json, gecontroleerd via
// `npm run validate:data`) — pas de JSON aan, niet dit bestand.
export const KOSTEN_ENTRIES: KostenEntry[] = kostenJson as KostenEntry[];

export function isDienstEntry(entry: KostenEntry): entry is DienstEntry {
  return entry.type === 'dienst';
}

export function isBelastingEntry(entry: KostenEntry): entry is BelastingEntry {
  return entry.type === 'belasting';
}

// Zelfde afronding/notatie als de oorspronkelijke financien/*.mdx tabellen:
// "€ 150" (met spatie), in tegenstelling tot de boetetabel die "€150" gebruikt.
export function formatTarief(waarde: Geldwaarde): string {
  const text = waarde.kind === 'bedrag' ? `€ ${waarde.bedrag}` : `€ ${waarde.min} – € ${waarde.max}`;
  return waarde.note ? `${text} (${waarde.note})` : text;
}

export function tariefSortValue(waarde: Geldwaarde): number {
  return waarde.kind === 'bedrag' ? waarde.bedrag : waarde.min;
}

export function formatTierBereik(tier: BelastingTier): string {
  return tier.maxAantal === null ? `${tier.minAantal}+` : `${tier.minAantal} – ${tier.maxAantal}`;
}
