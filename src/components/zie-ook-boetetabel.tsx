import { getBoeteEntryHref, getBoeteEntryLabel } from '@/lib/boetes-data';

// Plain <a> rather than next/link — zie zie-ook-wetboek.tsx voor de reden.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function ZieOokBoetetabel({ ids }: { ids: string[] }) {
  return (
    <div className="not-prose my-4 rounded-lg border bg-fd-card px-4 py-3 text-sm">
      <span className="font-medium text-fd-muted-foreground">Zie ook in de Boetetabel: </span>
      {ids.map((id, index) => (
        <span key={id}>
          {index > 0 ? <span className="text-fd-muted-foreground"> · </span> : null}
          <a href={`${basePath}${getBoeteEntryHref(id)}`} className="font-medium underline underline-offset-4">
            {getBoeteEntryLabel(id)}
          </a>
        </span>
      ))}
    </div>
  );
}
