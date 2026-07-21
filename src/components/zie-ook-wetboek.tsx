import { getWetboekEntryHref, getWetboekEntryLabel } from '@/lib/wetboek-data';

// Plain <a> rather than next/link: the CSS :target highlight on the
// destination row only fires on a real browser navigation, not on Next's
// client-side same-app routing (history.pushState doesn't set the
// document's target element in most browsers). A full navigation here is
// a non-issue — this is an occasional "look this up" jump, not hot nav path.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function ZieOokWetboek({ ids }: { ids: string[] }) {
  return (
    <div className="not-prose my-4 rounded-lg border bg-fd-card px-4 py-3 text-sm">
      <span className="font-medium text-fd-muted-foreground">Zie ook in het Wetboek: </span>
      {ids.map((id, index) => (
        <span key={id}>
          {index > 0 ? <span className="text-fd-muted-foreground"> · </span> : null}
          <a href={`${basePath}${getWetboekEntryHref(id)}`} className="font-medium underline underline-offset-4">
            {getWetboekEntryLabel(id)}
          </a>
        </span>
      ))}
    </div>
  );
}
