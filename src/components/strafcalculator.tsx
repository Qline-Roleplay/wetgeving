'use client';

import { useMemo, useState } from 'react';
import { WETBOEK_ENTRIES, WETTEN, formatStraf, type WetKey } from '@/lib/wetboek-data';

function parseNumber(raw: string | undefined): number | null {
  if (!raw) return null;
  const parsed = Number.parseFloat(raw.replace(',', '.'));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

export function Strafcalculator() {
  const [query, setQuery] = useState('');
  const [wetFilter, setWetFilter] = useState<WetKey | 'alle'>('alle');
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [altChoice, setAltChoice] = useState<Record<string, 'maanden' | 'taken'>>({});
  const [takenInputs, setTakenInputs] = useState<Record<string, string>>({});
  const [factorInputs, setFactorInputs] = useState<Record<string, string>>({});

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
    const incomplete: { feit: string; message: string }[] = [];

    for (const entry of WETBOEK_ENTRIES) {
      if (!selected[entry.id]) continue;
      count += 1;
      const straf = entry.straf;

      if (straf.kind === 'maanden') {
        maanden += straf.maanden;
      } else if (straf.kind === 'taken') {
        taken += straf.taken;
      } else if (straf.kind === 'keuze') {
        const choice = altChoice[entry.id] ?? 'maanden';
        if (choice === 'maanden') {
          maanden += straf.maanden;
        } else if (straf.taken !== undefined) {
          taken += straf.taken;
        } else {
          const parsed = parseNumber(takenInputs[entry.id]);
          if (parsed !== null) taken += Math.round(parsed);
          else incomplete.push({ feit: entry.feit, message: 'Vul het aantal taken in' });
        }
      } else {
        const parsed = parseNumber(factorInputs[entry.id]);
        if (parsed !== null) maanden += Math.round(straf.factor * parsed);
        else incomplete.push({ feit: entry.feit, message: `Vul ${straf.inputLabel.toLowerCase()} in` });
      }
    }

    return { maanden, taken, count, incomplete };
  }, [selected, altChoice, takenInputs, factorInputs]);

  function toggle(id: string) {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function reset() {
    setSelected({});
    setAltChoice({});
    setTakenInputs({});
    setFactorInputs({});
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
        <div className="max-h-[32rem] overflow-y-auto rounded-lg border">
          <ul className="divide-y">
            {filtered.map((entry) => {
              const isSelected = !!selected[entry.id];
              const straf = entry.straf;

              return (
                <li key={entry.id} className="flex flex-col gap-2 px-4 py-3 text-sm">
                  <div className="flex flex-wrap items-center gap-3">
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
                    <div className="whitespace-nowrap text-xs font-medium">{formatStraf(straf)}</div>
                  </div>

                  {isSelected && straf.kind === 'keuze' ? (
                    <div className="ml-7 flex flex-wrap items-center gap-3 text-xs text-fd-muted-foreground">
                      <label className="flex items-center gap-1">
                        <input
                          type="radio"
                          name={`alt-${entry.id}`}
                          checked={(altChoice[entry.id] ?? 'maanden') === 'maanden'}
                          onChange={() => setAltChoice((prev) => ({ ...prev, [entry.id]: 'maanden' }))}
                        />
                        {straf.maanden} maanden
                      </label>
                      <label className="flex items-center gap-1">
                        <input
                          type="radio"
                          name={`alt-${entry.id}`}
                          checked={altChoice[entry.id] === 'taken'}
                          onChange={() => setAltChoice((prev) => ({ ...prev, [entry.id]: 'taken' }))}
                        />
                        {straf.taken !== undefined ? `${straf.taken} taken` : 'taken'}
                      </label>
                      {altChoice[entry.id] === 'taken' && straf.taken === undefined ? (
                        <input
                          type="number"
                          min={0}
                          value={takenInputs[entry.id] ?? ''}
                          onChange={(e) => setTakenInputs((prev) => ({ ...prev, [entry.id]: e.target.value }))}
                          placeholder="aantal taken"
                          className="w-24 rounded-md border bg-fd-background px-2 py-1 text-xs outline-none focus:ring-2 focus:ring-fd-ring"
                        />
                      ) : null}
                    </div>
                  ) : null}

                  {isSelected && straf.kind === 'factor' ? (
                    <div className="ml-7 flex flex-wrap items-center gap-2 text-xs text-fd-muted-foreground">
                      <label className="flex items-center gap-2">
                        {straf.inputLabel}
                        <input
                          type="number"
                          min={0}
                          value={factorInputs[entry.id] ?? ''}
                          onChange={(e) => setFactorInputs((prev) => ({ ...prev, [entry.id]: e.target.value }))}
                          className="w-24 rounded-md border bg-fd-background px-2 py-1 text-xs outline-none focus:ring-2 focus:ring-fd-ring"
                        />
                      </label>
                      {(() => {
                        const parsed = parseNumber(factorInputs[entry.id]);
                        if (parsed === null) return null;
                        const computed = straf.factor * parsed;
                        return (
                          <span>
                            = {computed.toFixed(1)} → <span className="font-medium">{Math.round(computed)} maanden</span>
                          </span>
                        );
                      })()}
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
          {totals.incomplete.length > 0 ? (
            <div className="mt-4 border-t pt-3">
              <p className="mb-2 text-xs font-medium text-amber-600 dark:text-amber-400">Nog in te vullen:</p>
              <ul className="space-y-1 text-xs text-fd-muted-foreground">
                {totals.incomplete.map((item, index) => (
                  <li key={index}>
                    <span className="font-medium text-fd-foreground">{item.feit}:</span> {item.message}
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
