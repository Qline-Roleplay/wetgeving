'use client';

import { useMemo, useState } from 'react';
import { BOETES_ENTRIES, formatBoete } from '@/lib/boetes-data';

export function Boetecalculator() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [bereikChoice, setBereikChoice] = useState<Record<string, 'min' | 'max'>>({});

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return BOETES_ENTRIES;
    return BOETES_ENTRIES.filter((entry) => entry.overtreding.toLowerCase().includes(q));
  }, [query]);

  const totals = useMemo(() => {
    let bedrag = 0;
    let count = 0;
    const notes: { overtreding: string; note: string }[] = [];

    for (const entry of BOETES_ENTRIES) {
      if (!selected[entry.id]) continue;
      count += 1;
      const waarde = entry.bedrag;

      if (waarde.kind === 'bedrag') {
        bedrag += waarde.bedrag;
      } else {
        const choice = bereikChoice[entry.id] ?? 'min';
        bedrag += choice === 'min' ? waarde.min : waarde.max;
      }

      if (waarde.note) notes.push({ overtreding: entry.overtreding, note: waarde.note });
    }

    return { bedrag, count, notes };
  }, [selected, bereikChoice]);

  function toggle(id: string) {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function reset() {
    setSelected({});
    setBereikChoice({});
  }

  return (
    <div className="not-prose my-6 flex flex-col gap-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Zoek op overtreding, bijv. rijbewijs of rood licht"
        className="rounded-lg border bg-fd-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-fd-ring"
      />

      <div className="grid gap-4 lg:grid-cols-[1fr_280px] lg:items-start">
        <div className="max-h-[32rem] overflow-y-auto rounded-lg border">
          <ul className="divide-y">
            {filtered.map((entry) => {
              const isSelected = !!selected[entry.id];
              const waarde = entry.bedrag;

              return (
                <li key={entry.id} className="flex flex-col gap-2 px-4 py-3 text-sm">
                  <div className="flex flex-wrap items-center gap-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggle(entry.id)}
                      className="size-4 shrink-0"
                    />
                    <div className="min-w-0 flex-1 font-medium">{entry.overtreding}</div>
                    <div className="whitespace-nowrap text-xs font-medium">{formatBoete(waarde)}</div>
                  </div>

                  {isSelected && waarde.kind === 'bereik' ? (
                    <div className="ml-7 flex flex-wrap items-center gap-3 text-xs text-fd-muted-foreground">
                      <label className="flex items-center gap-1">
                        <input
                          type="radio"
                          name={`bereik-${entry.id}`}
                          checked={(bereikChoice[entry.id] ?? 'min') === 'min'}
                          onChange={() => setBereikChoice((prev) => ({ ...prev, [entry.id]: 'min' }))}
                        />
                        €{waarde.min}
                      </label>
                      <label className="flex items-center gap-1">
                        <input
                          type="radio"
                          name={`bereik-${entry.id}`}
                          checked={bereikChoice[entry.id] === 'max'}
                          onChange={() => setBereikChoice((prev) => ({ ...prev, [entry.id]: 'max' }))}
                        />
                        €{waarde.max}
                      </label>
                    </div>
                  ) : null}
                </li>
              );
            })}
            {filtered.length === 0 ? (
              <li className="px-4 py-6 text-center text-sm text-fd-muted-foreground">Geen overtredingen gevonden.</li>
            ) : null}
          </ul>
        </div>

        <div className="rounded-lg border bg-fd-card p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-medium">Totaal</span>
            <button
              type="button"
              onClick={reset}
              className="text-xs text-fd-muted-foreground underline underline-offset-4 hover:text-fd-foreground"
            >
              Wis selectie
            </button>
          </div>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-fd-muted-foreground">Overtredingen</dt>
              <dd className="font-medium">{totals.count}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-fd-muted-foreground">Totaalbedrag</dt>
              <dd className="font-medium">€{totals.bedrag}</dd>
            </div>
          </dl>
          {totals.notes.length > 0 ? (
            <div className="mt-4 border-t pt-3">
              <p className="mb-2 text-xs font-medium text-amber-600 dark:text-amber-400">Zelf meenemen:</p>
              <ul className="space-y-1 text-xs text-fd-muted-foreground">
                {totals.notes.map((item, index) => (
                  <li key={index}>
                    <span className="font-medium text-fd-foreground">{item.overtreding}:</span> {item.note}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
