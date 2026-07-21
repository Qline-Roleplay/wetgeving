'use client';

import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';

interface Column<T> {
  key: string;
  label: string;
  value: (row: T) => string | number;
  render: (row: T) => ReactNode;
}

interface SortState {
  key: string;
  dir: 'asc' | 'desc';
}

interface SortableTableProps<T> {
  rows: T[];
  columns: Column<T>[];
  rowId: (row: T) => string;
  rowClassName?: (row: T) => string | undefined;
}

export function SortableTable<T>({ rows, columns, rowId, rowClassName }: SortableTableProps<T>) {
  const [sort, setSort] = useState<SortState | null>(null);

  const sortedRows = useMemo(() => {
    if (!sort) return rows;
    const column = columns.find((c) => c.key === sort.key);
    if (!column) return rows;

    const copy = [...rows];
    copy.sort((a, b) => {
      const av = column.value(a);
      const bv = column.value(b);
      const cmp =
        typeof av === 'number' && typeof bv === 'number' ? av - bv : String(av).localeCompare(String(bv), 'nl');
      return sort.dir === 'asc' ? cmp : -cmp;
    });
    return copy;
  }, [rows, sort, columns]);

  function toggleSort(key: string) {
    setSort((prev) => {
      if (!prev || prev.key !== key) return { key, dir: 'asc' };
      if (prev.dir === 'asc') return { key, dir: 'desc' };
      return null;
    });
  }

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => {
            const isActive = sort?.key === column.key;
            return (
              <th key={column.key}>
                <button
                  type="button"
                  onClick={() => toggleSort(column.key)}
                  className="inline-flex items-center gap-1 font-medium not-prose"
                >
                  {column.label}
                  <span className="text-xs text-fd-muted-foreground">
                    {isActive ? (sort.dir === 'asc' ? '▲' : '▼') : '↕'}
                  </span>
                </button>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {sortedRows.map((row) => (
          <tr key={rowId(row)} id={rowId(row)} className={rowClassName?.(row)}>
            {columns.map((column) => (
              <td key={column.key}>{column.render(row)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
