const CATEGORIE_STYLES: Record<number, string> = {
  1: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
  2: 'border-lime-500/30 bg-lime-500/10 text-lime-700 dark:text-lime-400',
  3: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400',
  4: 'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400',
  5: 'border-orange-500/30 bg-orange-500/10 text-orange-700 dark:text-orange-400',
  6: 'border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-400',
  7: 'border-rose-600/30 bg-rose-600/10 text-rose-700 dark:text-rose-400',
  8: 'border-fd-primary/40 bg-fd-primary/10 text-fd-primary',
};

const CATEGORIE_LABELS: Record<number, string> = {
  1: 'Waarschuwing',
  2: 'Taakstraf',
  3: 'Ban — 1 dag',
  4: 'Ban — 3 dagen',
  5: 'Ban — 7 dagen',
  6: 'Ban — 14 dagen',
  7: 'Ban — 30 dagen',
  8: 'Permanente ban',
};

export function CategorieBadge({ n }: { n: number }) {
  const style = CATEGORIE_STYLES[n] ?? CATEGORIE_STYLES[1];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium not-prose whitespace-nowrap ${style}`}
    >
      Categorie {n}
    </span>
  );
}

export function Strafmaat({ categorie, note }: { categorie: number; note?: string }) {
  return (
    <div className="not-prose my-4 flex flex-wrap items-center gap-2 rounded-lg border bg-fd-card px-4 py-3 text-sm">
      <span className="font-medium text-fd-muted-foreground">Strafmaat:</span>
      <CategorieBadge n={categorie} />
      <span className="text-fd-muted-foreground">{CATEGORIE_LABELS[categorie]}</span>
      {note ? <span className="text-fd-muted-foreground">— {note}</span> : null}
    </div>
  );
}
