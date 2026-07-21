import Link from 'next/link';
import { Provider } from '@/components/provider';
import { appName } from '@/lib/shared';
import './global.css';

// This is the file GitHub Pages actually serves as the static 404.html for
// any unmatched URL — a static export has no server to pick between this
// and (docs)/not-found.tsx at request time, so this one carries the real
// "mistyped URL" experience and (docs)/not-found.tsx only covers the rare
// in-app notFound() call during a build.
export default function RootNotFound() {
  return (
    <html lang="nl" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Provider>
          <div className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-4 px-4 text-center">
            <p className="text-sm font-medium text-fd-muted-foreground">{appName}</p>
            <p className="text-sm font-semibold text-fd-primary">404</p>
            <h1 className="text-2xl font-semibold">Pagina niet gevonden</h1>
            <p className="text-fd-muted-foreground">
              De pagina die je zoekt bestaat niet (meer). Mogelijk is de link
              verouderd of bevat de URL een typefout.
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-3">
              <Link
                href="/"
                className="rounded-lg bg-fd-primary px-4 py-2 text-sm font-medium text-fd-primary-foreground hover:opacity-90"
              >
                Terug naar home
              </Link>
              <Link href="/wetboek" className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-fd-accent">
                Wetboek
              </Link>
              <Link href="/apv" className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-fd-accent">
                APV
              </Link>
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
}
