'use client';

import { WETBOEK_ENTRIES, formatStraf, strafSortValue, type StrafEntry, type WetKey } from '@/lib/wetboek-data';
import { SortableTable } from './sortable-table';

export function WetTable({ wet }: { wet: WetKey }) {
  const rows = WETBOEK_ENTRIES.filter((entry) => entry.wet === wet);

  return (
    <SortableTable<StrafEntry>
      rows={rows}
      rowId={(entry) => entry.id}
      rowClassName={() => 'scroll-mt-24 target:bg-fd-primary/10'}
      columns={[
        { key: 'feit', label: 'Feit', value: (entry) => entry.feit, render: (entry) => entry.feit },
        { key: 'artikel', label: 'Artikel', value: (entry) => entry.artikel, render: (entry) => entry.artikel },
        {
          key: 'straf',
          label: 'Strafmaat',
          value: (entry) => strafSortValue(entry.straf),
          render: (entry) => formatStraf(entry.straf),
        },
      ]}
    />
  );
}
