'use client';

import { useMemo, useState } from 'react';
import { WETBOEK_ENTRIES, WETTEN, formatStraf, type WetKey } from '@/lib/wetboek-data';

export function Strafcalculator() {
  const [query, setQuery] = useState('');
  const [wetFilter, setWetFilter] = useState<WetKey | 'alle'>('alle');
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [altChoice, setAltChoice] = useState<Record<string, 'maanden' | 'taken'>>({});

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return WETBOEK_ENTRIES.filter((entry) => {
      if (wetFilter !== 'alle' && entry.wet !== wetFilter) return false;
      if (!q) return true;
      return (
        entry.feit.toLowerCase().includes(q) ||
        entry.artikel.toLowerCase().includes(q) ||
        WETTEN[entry.wet].toLowerCase().includes(q)
      );
    });
  }, [query, wetFilter]);

  const totals = useMemo(() => {
    let maanden = 0;
    let taken = 0;
    let count = 0;
    const bijzonder: { feit: string; label: string }[] = [];

    for (const entry of WETBOEK_ENTRIES) {
      if (!selected[entry.id]) continue;
      count += 1;
      const straf = entry.straf;

      if (straf.kind === 'maanden') {
        maanden += straf.maanden;
      } else if (straf.kind === 'taken') {
        taken += straf.taken;
      } else if (straf.kind === 'maanden_of_taken') {
        if ((altChoice[entry.id] ?? 'maanden') === 'maanden') {
          maanden += straf.maanden;
        } else {
          taken += straf.taken;
        }
      } else {
        bijzonder.push({ feit: entry.feit, label: straf.label });
      }
    }

    return { maanden, taken, count, bijzonder };
  }, [selected, altChoice]);

  function toggle(id: string) {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function reset() {
    setSelected({});
    setAltChoice({});
  }

  return (
    <div className="not-prose my-6 flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Zoek op feit of artikel, bijv. moord of art. 289"
          className="flex-1 rounded-lg border bg-fd-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-fd-ring"
        />
        <select
          value={wetFilter}
          onChange={(e) => setWetFilter(e.target.value as WetKey | 'alle')}
          className="rounded-lg border bg-fd-background px-3 py-2 text-sm"
        >
          <option value="alle">Alle wetten</option>
          {Object.entries(WETTEN).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_280px] lg:items-start">
        <div className="max-h-[28rem] overflow-y-auto rounded-lg border">
          <ul className="divide-y">
            {filtered.map((entry) => {
              const isSelected = !!selected[entry.id];

              return (
                <li key={entry.id} className="flex flex-wrap items-center gap-3 px-4 py-3 text-sm">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggle(entry.id)}
                    className="size-4 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="font-medium">{entry.feit}</div>
                    <div className="text-xs text-fd-muted-foreground">
                      {WETTEN[entry.wet]} — {entry.artikel}
                    </div>
                  </div>
                  <div className="whitespace-nowrap text-xs font-medium">{formatStraf(entry.straf)}</div>
                  {isSelected && entry.straf.kind === 'maanden_of_taken' ? (
                    <div className="flex gap-3 text-xs text-fd-muted-foreground">
                      <label className="flex items-center gap-1">
                        <input
                          type="radio"
                          name={`alt-${entry.id}`}
                          checked={(altChoice[entry.id] ?? 'maanden') === 'maanden'}
                          onChange={() => setAltChoice((prev) => ({ ...prev, [entry.id]: 'maanden' }))}
                        />
                        Maanden
                      </label>
                      <label className="flex items-center gap-1">
                        <input
                          type="radio"
                          name={`alt-${entry.id}`}
                          checked={altChoice[entry.id] === 'taken'}
                          onChange={() => setAltChoice((prev) => ({ ...prev, [entry.id]: 'taken' }))}
                        />
                        Taken
                      </label>
                    </div>
                  ) : null}
                </li>
              );
            })}
            {filtered.length === 0 ? (
              <li className="px-4 py-6 text-center text-sm text-fd-muted-foreground">Geen feiten gevonden.</li>
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
              <dt className="text-fd-muted-foreground">Feiten geselecteerd</dt>
              <dd className="font-medium">{totals.count}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-fd-muted-foreground">Celstraf</dt>
              <dd className="font-medium">{totals.maanden} maanden</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-fd-muted-foreground">Taakstraf</dt>
              <dd className="font-medium">{totals.taken} taken</dd>
            </div>
          </dl>
          {totals.bijzonder.length > 0 ? (
            <div className="mt-4 border-t pt-3">
              <p className="mb-2 text-xs font-medium text-fd-muted-foreground">Niet automatisch meegeteld:</p>
              <ul className="space-y-1 text-xs">
                {totals.bijzonder.map((item, index) => (
                  <li key={index}>
                    <span className="font-medium">{item.feit}:</span> {item.label}
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
