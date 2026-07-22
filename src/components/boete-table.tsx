'use client';

import { useMemo, useState } from 'react';
import { BOETES_ENTRIES, boeteSortValue, formatBoete, type BoeteCategorie, type BoeteEntry } from '@/lib/boetes-data';
import { SortableTable } from './sortable-table';

const CATEGORIE_LABELS: Record<BoeteCategorie, string> = {
  verkeer: 'Verkeer',
  'openbare-orde': 'Openbare orde',
};

export function BoeteTable() {
  const [categorie, setCategorie] = useState<BoeteCategorie | 'alle'>('alle');

  const rows = useMemo(
    () => (categorie === 'alle' ? BOETES_ENTRIES : BOETES_ENTRIES.filter((entry) => entry.categorie === categorie)),
    [categorie],
  );

  return (
    <>
      <div className="not-prose mb-3">
        <select
          value={categorie}
          onChange={(e) => setCategorie(e.target.value as BoeteCategorie | 'alle')}
          className="w-fit rounded-lg border bg-fd-background px-3 py-2 text-sm"
          aria-label="Filter op categorie"
        >
          <option value="alle">Alle categorieën</option>
          {Object.entries(CATEGORIE_LABELS).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <SortableTable<BoeteEntry>
        rows={rows}
        rowId={(entry) => entry.id}
        columns={[
          {
            key: 'overtreding',
            label: 'Overtreding',
            value: (entry) => entry.overtreding,
            render: (entry) => entry.overtreding,
          },
          {
            key: 'bedrag',
            label: 'Boetebedrag',
            value: (entry) => boeteSortValue(entry.bedrag),
            render: (entry) => formatBoete(entry.bedrag),
          },
        ]}
      />
    </>
  );
}
