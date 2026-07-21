export type BoeteValue =
  | { kind: 'bedrag'; bedrag: number; note?: string }
  | { kind: 'bereik'; min: number; max: number; note?: string };

export interface BoeteEntry {
  id: string;
  overtreding: string;
  bedrag: BoeteValue;
}

// Eén bron van waarheid voor zowel de boetetabel als de boetecalculator.
// Moet in sync blijven met content/docs/wetboek/boetes-en-overtredingen.mdx.
export const BOETES_ENTRIES: BoeteEntry[] = [
  { id: 'boete-20-50-te-hard', overtreding: '20 tot 50 km/h te hard rijden', bedrag: { kind: 'bereik', min: 150, max: 350 } },
  { id: 'boete-10-te-hard', overtreding: 'Meer dan 10 km/h te hard rijden', bedrag: { kind: 'bedrag', bedrag: 90 } },
  { id: 'boete-50-te-hard', overtreding: 'Meer dan 50 km/h te hard rijden', bedrag: { kind: 'bedrag', bedrag: 550 } },
  { id: 'boete-overige-wvw', overtreding: 'Overige WVW-overtredingen', bedrag: { kind: 'bedrag', bedrag: 110 } },
  { id: 'boete-beledigen-ambtenaar', overtreding: 'Beledigen van een ambtenaar in functie', bedrag: { kind: 'bedrag', bedrag: 200 } },
  { id: 'boete-belemmeren-politiewerk', overtreding: 'Belemmeren van politiewerk', bedrag: { kind: 'bedrag', bedrag: 300 } },
  { id: 'boete-geen-voorrang-zebrapad', overtreding: 'Geen voorrang geven bij een zebrapad', bedrag: { kind: 'bedrag', bedrag: 250 } },
  { id: 'boete-geen-veiligheidsgordel', overtreding: 'Het niet dragen van de veiligheidsgordel', bedrag: { kind: 'bedrag', bedrag: 70 } },
  { id: 'boete-geen-helm', overtreding: 'Het niet dragen van een helm op een motor', bedrag: { kind: 'bedrag', bedrag: 165 } },
  { id: 'boete-doorgetrokken-streep', overtreding: 'Het rijden door een doorgetrokken streep', bedrag: { kind: 'bedrag', bedrag: 160 } },
  { id: 'boete-illegaal-parkeren', overtreding: 'Illegaal parkeren', bedrag: { kind: 'bedrag', bedrag: 90 } },
  { id: 'boete-keren-niet-toegestaan', overtreding: 'Keren waar dat niet toegestaan is', bedrag: { kind: 'bedrag', bedrag: 130 } },
  { id: 'boete-telefoon-in-hand', overtreding: 'Met telefoon in de hand rijden', bedrag: { kind: 'bedrag', bedrag: 175 } },
  { id: 'boete-mishandeling', overtreding: 'Mishandeling (boete-variant)', bedrag: { kind: 'bedrag', bedrag: 450 } },
  { id: 'boete-rood-verkeerslicht', overtreding: 'Negeren van een rood verkeerslicht', bedrag: { kind: 'bedrag', bedrag: 225 } },
  { id: 'boete-geen-id-bewijs', overtreding: 'Niet kunnen tonen van een ID-bewijs', bedrag: { kind: 'bedrag', bedrag: 220 } },
  { id: 'boete-stopteken', overtreding: 'Niet opvolgen van een stopteken', bedrag: { kind: 'bedrag', bedrag: 330 } },
  { id: 'boete-claxonneren', overtreding: 'Onnodig claxonneren', bedrag: { kind: 'bedrag', bedrag: 90 } },
  { id: 'boete-geluid-maken', overtreding: 'Onnodig geluid maken', bedrag: { kind: 'bedrag', bedrag: 110 } },
  { id: 'boete-trottoir', overtreding: 'Parkeren op het trottoir', bedrag: { kind: 'bedrag', bedrag: 80 } },
  { id: 'boete-twee-parkeervakken', overtreding: 'Parkeren op twee parkeervakken', bedrag: { kind: 'bedrag', bedrag: 65 } },
  { id: 'boete-wok-status', overtreding: 'Rijden in een voertuig met WOK-status', bedrag: { kind: 'bedrag', bedrag: 330, note: '+ inbeslagname na 2e keer' } },
  { id: 'boete-onder-invloed', overtreding: 'Rijden onder invloed van verdovende middelen', bedrag: { kind: 'bedrag', bedrag: 380 } },
  { id: 'boete-zonder-rijbewijs-1', overtreding: 'Rijden zonder rijbewijs (1e keer)', bedrag: { kind: 'bedrag', bedrag: 250 } },
  { id: 'boete-zonder-rijbewijs-2', overtreding: 'Rijden zonder rijbewijs (2e keer)', bedrag: { kind: 'bedrag', bedrag: 370 } },
  { id: 'boete-zonder-rijbewijs-3', overtreding: 'Rijden zonder rijbewijs (3e keer)', bedrag: { kind: 'bedrag', bedrag: 550, note: '+ inbeslagname voertuig' } },
  { id: 'boete-zonder-rijbewijs-4', overtreding: 'Rijden zonder rijbewijs (4e keer)', bedrag: { kind: 'bedrag', bedrag: 900, note: '+ aanhouding + inbeslagname voertuig' } },
  { id: 'boete-openbare-orde', overtreding: 'Verstoren van de openbare orde', bedrag: { kind: 'bedrag', bedrag: 220 } },
  { id: 'boete-voertuigwrak', overtreding: 'Voertuigwrak op de weg laten staan', bedrag: { kind: 'bedrag', bedrag: 185 } },
];

export function formatBoete(bedrag: BoeteValue): string {
  const bedragText =
    bedrag.kind === 'bedrag' ? `€${bedrag.bedrag}` : `€${bedrag.min} – €${bedrag.max}`;
  return bedrag.note ? `${bedragText} (${bedrag.note})` : bedragText;
}
