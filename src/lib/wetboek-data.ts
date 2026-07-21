export type WetKey = 'bw' | 'opw' | 'gw' | 'wvw' | 'wwm' | 'sr';

export const WETTEN: Record<WetKey, string> = {
  bw: 'Burgerlijk Wetboek (BW.)',
  opw: 'Opiumwet (Opw.)',
  gw: 'Gemeentewet Qline (GW.)',
  wvw: 'Wegenverkeerswet (WVW.)',
  wwm: 'Wet Wapens en Munitie (WWM.)',
  sr: 'Wetboek van Strafrecht (Sr.)',
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
// Moet in sync blijven met de teksten in content/docs/wetboek/*.
export const WETBOEK_ENTRIES: StrafEntry[] = [
  // Burgerlijk Wetboek (BW.)
  { id: 'bw-contractbreuk', feit: 'Contractbreuk', wet: 'bw', artikel: 'Art. 6:74 BW.', straf: { kind: 'maanden', maanden: 7 } },

  // Opiumwet (Opw.)
  { id: 'opw-harddrugs-bezit', feit: 'Het in bezit hebben van harddrugs', wet: 'opw', artikel: 'Art. 2 Opw.', straf: { kind: 'maanden', maanden: 14 } },
  { id: 'opw-softdrugs-bezit', feit: 'Het in bezit hebben van softdrugs', wet: 'opw', artikel: 'Art. 2 Opw.', straf: { kind: 'maanden', maanden: 10 } },
  { id: 'opw-harddrugs-productie', feit: 'Productie van harddrugs', wet: 'opw', artikel: 'Art. 2 Opw.', straf: { kind: 'maanden', maanden: 17 } },
  { id: 'opw-softdrugs-productie', feit: 'Productie van softdrugs', wet: 'opw', artikel: 'Art. 2 Opw.', straf: { kind: 'maanden', maanden: 14 } },
  { id: 'opw-ingredienten', feit: 'Simultaan bezit van 3 of meer ingrediënten voor productie soft- en harddrugs', wet: 'opw', artikel: 'Art. 3 Opw.', straf: { kind: 'maanden', maanden: 5 } },

  // Gemeentewet Qline (GW.)
  { id: 'gw-openstaande-boetes', feit: 'Het meer dan €30.000 aan boetes open hebben staan', wet: 'gw', artikel: 'Art. 3 GW.', straf: { kind: 'factor', label: 'Aantal boetes × 0,6', factor: 0.6, inputLabel: 'Aantal openstaande boetes' } },
  { id: 'gw-vluchten', feit: 'Het vluchten voor de politie', wet: 'gw', artikel: 'Art. 1 GW.', straf: { kind: 'keuze', maanden: 5, taken: 14 } },
  { id: 'gw-hinderen-achtervolging', feit: 'Hinderen van politie tijdens achtervolging', wet: 'gw', artikel: 'Art. 2 GW.', straf: { kind: 'keuze', maanden: 4, taken: 12 } },

  // Wegenverkeerswet (WVW.)
  { id: 'wvw-weigeren-stopbevel', feit: 'Weigeren van een bevel tot stoppen', wet: 'wvw', artikel: 'Art. 5 WVW.', straf: { kind: 'keuze', maanden: 3 } },
  { id: 'wvw-zonder-rijbewijs', feit: 'Rijden zonder geldig rijbewijs', wet: 'wvw', artikel: 'Art. 9 WVW.', straf: { kind: 'taken', taken: 20 } },
  { id: 'wvw-onder-invloed', feit: 'Rijden onder invloed van verdovende middelen', wet: 'wvw', artikel: 'Art. 8 WVW.', straf: { kind: 'keuze', maanden: 4 } },
  { id: 'wvw-zonder-rijbewijs-3x', feit: 'Rijden zonder geldig rijbewijs (na 3x aanspreken)', wet: 'wvw', artikel: 'Art. 107 WVW.', straf: { kind: 'keuze', maanden: 7 } },
  { id: 'wvw-ongeval-veroorzaken', feit: 'Verkeersongeval veroorzaken', wet: 'wvw', artikel: 'Art. 6 WVW.', straf: { kind: 'keuze', maanden: 9 } },
  { id: 'wvw-verlaten-plaats-ongeval', feit: 'Verlaten plaats ongeval', wet: 'wvw', artikel: 'Art. 7 WVW.', straf: { kind: 'keuze', maanden: 4 } },

  // Wet Wapens en Munitie (WWM.)
  { id: 'wwm-steekwapen', feit: 'Het in bezit hebben van een (steek)wapen', wet: 'wwm', artikel: 'Art. 13 WWM.', straf: { kind: 'maanden', maanden: 7 } },
  { id: 'wwm-explosief', feit: 'Het in bezit hebben van een explosief', wet: 'wwm', artikel: 'Art. 26 WWM.', straf: { kind: 'maanden', maanden: 9 } },
  { id: 'wwm-vuurwapen', feit: 'Het in bezit hebben van een vuurwapen', wet: 'wwm', artikel: 'Art. 26 WWM.', straf: { kind: 'maanden', maanden: 12 } },
  { id: 'wwm-munitie', feit: 'Het in bezit hebben van munitie', wet: 'wwm', artikel: 'Art. 26 WWM.', straf: { kind: 'maanden', maanden: 7 } },
  { id: 'wwm-geweldsvoorwerp', feit: 'Het in bezit hebben van een voorwerp gebruikt voor geweldpleging', wet: 'wwm', artikel: 'Art. 27 WWM.', straf: { kind: 'maanden', maanden: 6 } },

  // Wetboek van Strafrecht (Sr.)
  { id: 'sr-belediging-ambtenaar', feit: 'Belediging ambtenaar in functie', wet: 'sr', artikel: 'Art. 266 Sr.', straf: { kind: 'taken', taken: 7 } },
  { id: 'sr-criminele-organisatie-deelnemen', feit: 'Deelnemen aan een criminele organisatie', wet: 'sr', artikel: 'Art. 140 Sr.', straf: { kind: 'maanden', maanden: 7 } },
  { id: 'sr-diefstal', feit: 'Diefstal (goederen, ook voertuigen)', wet: 'sr', artikel: 'Art. 310 Sr.', straf: { kind: 'maanden', maanden: 6 } },
  { id: 'sr-doodslag', feit: 'Doodslag', wet: 'sr', artikel: 'Art. 287 Sr.', straf: { kind: 'maanden', maanden: 10 } },
  { id: 'sr-doodslag-ambtenaar', feit: 'Doodslag op een ambtenaar in functie', wet: 'sr', artikel: 'Art. 287 Sr.', straf: { kind: 'maanden', maanden: 14 } },
  { id: 'sr-fraude', feit: 'Fraude', wet: 'sr', artikel: 'Art. 326 Sr.', straf: { kind: 'maanden', maanden: 3 } },
  { id: 'sr-heling', feit: 'Heling', wet: 'sr', artikel: 'Art. 416 Sr.', straf: { kind: 'maanden', maanden: 4 } },
  { id: 'sr-omkoping', feit: 'Het (proberen) omkopen van een ambtenaar', wet: 'sr', artikel: 'Art. 177 Sr.', straf: { kind: 'maanden', maanden: 4 } },
  { id: 'sr-valse-112-melding', feit: 'Het maken van een valse 112-melding', wet: 'sr', artikel: 'Art. 142 Sr.', straf: { kind: 'taken', taken: 6 } },
  { id: 'sr-inbraak', feit: 'Inbraak', wet: 'sr', artikel: 'Art. 138 Sr.', straf: { kind: 'maanden', maanden: 7 } },
  { id: 'sr-criminele-organisatie-leiding', feit: 'Leiding geven aan een criminele organisatie', wet: 'sr', artikel: 'Art. 140 Sr.', straf: { kind: 'maanden', maanden: 10 } },
  { id: 'sr-lekken-informatie', feit: 'Lekken van vertrouwelijke informatie', wet: 'sr', artikel: 'Art. 272 Sr.', straf: { kind: 'maanden', maanden: 5 } },
  { id: 'sr-medeplegen', feit: 'Medeplegen van een strafbaar feit', wet: 'sr', artikel: 'Art. 47 Sr.', straf: { kind: 'maanden', maanden: 3 } },
  { id: 'sr-medeplichtigheid', feit: 'Medeplichtigheid aan een strafbaar feit', wet: 'sr', artikel: 'Art. 48 Sr.', straf: { kind: 'maanden', maanden: 3 } },
  { id: 'sr-mishandeling', feit: 'Mishandeling', wet: 'sr', artikel: 'Art. 300 Sr.', straf: { kind: 'maanden', maanden: 6 } },
  { id: 'sr-mishandeling-ambtenaar', feit: 'Mishandeling van een ambtenaar in functie', wet: 'sr', artikel: 'Art. 300 & 304 Sr.', straf: { kind: 'maanden', maanden: 7 } },
  { id: 'sr-moord', feit: 'Moord', wet: 'sr', artikel: 'Art. 289 Sr.', straf: { kind: 'maanden', maanden: 15 } },
  { id: 'sr-moord-ambtenaar', feit: 'Moord op een ambtenaar in functie', wet: 'sr', artikel: 'Art. 289 Sr.', straf: { kind: 'maanden', maanden: 19 } },
  { id: 'sr-niet-opvolgen-bevel', feit: 'Niet opvolgen van een ambtelijk bevel na 3 vorderingen', wet: 'sr', artikel: 'Art. 184 Sr.', straf: { kind: 'taken', taken: 12 } },
  { id: 'sr-privéterrein', feit: 'Onbevoegd betreden van een privéterrein', wet: 'sr', artikel: 'Art. 461 Sr.', straf: { kind: 'taken', taken: 7 } },
  { id: 'sr-gijzeling', feit: 'Ontvoering / gijzeling', wet: 'sr', artikel: 'Art. 282 Sr.', straf: { kind: 'maanden', maanden: 7 } },
  { id: 'sr-gijzeling-ambtenaar', feit: 'Ontvoering / gijzeling van een ambtenaar in functie', wet: 'sr', artikel: 'Art. 282 Sr.', straf: { kind: 'maanden', maanden: 10 } },
  { id: 'sr-oplichting', feit: 'Oplichting', wet: 'sr', artikel: 'Art. 326 Sr.', straf: { kind: 'maanden', maanden: 4 } },
  { id: 'sr-bankoverval', feit: 'Plegen van een bankoverval', wet: 'sr', artikel: 'Art. 312 Sr.', straf: { kind: 'maanden', maanden: 20 } },
  { id: 'sr-overval-gewapend', feit: 'Plegen van een overval (gewapend)', wet: 'sr', artikel: 'Art. 317 Sr.', straf: { kind: 'maanden', maanden: 12 } },
  { id: 'sr-overval-ongewapend', feit: 'Plegen van een overval (ongewapend)', wet: 'sr', artikel: 'Art. 317 Sr.', straf: { kind: 'maanden', maanden: 8 } },
  { id: 'sr-plofkraak', feit: 'Plegen van een plofkraak', wet: 'sr', artikel: 'Art. 311 Sr.', straf: { kind: 'maanden', maanden: 7 } },
  { id: 'sr-poging-doodslag', feit: 'Poging tot doodslag', wet: 'sr', artikel: 'Art. 45 & 287 Sr.', straf: { kind: 'maanden', maanden: 7 } },
  { id: 'sr-poging-doodslag-ambtenaar', feit: 'Poging tot doodslag op een ambtenaar in functie', wet: 'sr', artikel: 'Art. 45 & 287 Sr.', straf: { kind: 'maanden', maanden: 9 } },
  { id: 'sr-poging-misdrijf', feit: 'Poging tot het plegen van een misdrijf', wet: 'sr', artikel: 'Art. 45 Sr.', straf: { kind: 'factor', label: 'Strafeis × 0,5', factor: 0.5, inputLabel: 'Strafeis (in maanden)' } },
  { id: 'sr-poging-moord', feit: 'Poging tot moord', wet: 'sr', artikel: 'Art. 45 & 289 Sr.', straf: { kind: 'maanden', maanden: 10 } },
  { id: 'sr-smaad', feit: 'Smaad', wet: 'sr', artikel: 'Art. 261 Sr.', straf: { kind: 'maanden', maanden: 4 } },
  { id: 'sr-vandalisme', feit: 'Vandalisme', wet: 'sr', artikel: 'Art. 350 Sr.', straf: { kind: 'taken', taken: 13 } },
  { id: 'sr-zware-mishandeling', feit: 'Zware mishandeling', wet: 'sr', artikel: 'Art. 302 Sr.', straf: { kind: 'maanden', maanden: 9 } },
  { id: 'sr-zware-mishandeling-ambtenaar', feit: 'Zware mishandeling van een ambtenaar in functie', wet: 'sr', artikel: 'Art. 302 & 304 Sr.', straf: { kind: 'maanden', maanden: 12 } },
];

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
