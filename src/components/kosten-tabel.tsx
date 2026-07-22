'use client';

import {
  KOSTEN_ENTRIES,
  formatTarief,
  formatTierBereik,
  isBelastingEntry,
  isDienstEntry,
  tariefSortValue,
  type BelastingTier,
  type DienstEntry,
  type KostenCategorie,
} from '@/lib/kosten-data';
import { SortableTable } from './sortable-table';

interface BelastingRow {
  id: string;
  tier: BelastingTier;
  eenheid: string;
}

export function KostenTabel({ categorie }: { categorie: KostenCategorie }) {
  if (categorie === 'belasting') {
    const entries = KOSTEN_ENTRIES.filter(isBelastingEntry);
    const rows: BelastingRow[] = entries.flatMap((entry) =>
      entry.tiers.map((tier, index) => ({ id: `${entry.id}-${index}`, tier, eenheid: entry.eenheid })),
    );
    const eenheid = entries[0]?.eenheid ?? '';

    return (
      <SortableTable<BelastingRow>
        rows={rows}
        rowId={(row) => row.id}
        columns={[
          {
            key: 'aantal',
            label: 'Aantal motorvoertuigen',
            value: (row) => row.tier.minAantal,
            render: (row) => formatTierBereik(row.tier),
          },
          {
            key: 'bedrag',
            label: `Bedrag ${eenheid} (voorbeeld)`,
            value: (row) => row.tier.bedrag,
            render: (row) => `€ ${row.tier.bedrag}`,
          },
        ]}
      />
    );
  }

  const rows = KOSTEN_ENTRIES.filter(isDienstEntry).filter((entry) => entry.categorie === categorie);

  return (
    <SortableTable<DienstEntry>
      rows={rows}
      rowId={(entry) => entry.id}
      columns={[
        { key: 'naam', label: 'Dienst', value: (entry) => entry.naam, render: (entry) => entry.naam },
        {
          key: 'tarief',
          label: 'Tarief (voorbeeld)',
          value: (entry) => tariefSortValue(entry.tarief),
          render: (entry) => formatTarief(entry.tarief),
        },
      ]}
    />
  );
}
