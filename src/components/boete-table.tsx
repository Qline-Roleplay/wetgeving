'use client';

import { BOETES_ENTRIES, boeteSortValue, formatBoete, type BoeteEntry } from '@/lib/boetes-data';
import { SortableTable } from './sortable-table';

export function BoeteTable() {
  return (
    <SortableTable<BoeteEntry>
      rows={BOETES_ENTRIES}
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
  );
}
