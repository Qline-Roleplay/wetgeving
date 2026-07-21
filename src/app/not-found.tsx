import Link from 'next/link';
import { Provider } from '@/components/provider';
import './global.css';

// Root-level fallback for the rare case a request never reaches the
// (docs) route group at all. The (docs)/not-found.tsx page (with the
// sidebar/nav) handles the vast majority of 404s in practice.
export default function RootNotFound() {
  return (
    <html lang="nl" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Provider>
          <div className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-4 px-4 text-center">
            <p className="text-sm font-semibold text-fd-primary">404</p>
            <h1 className="text-2xl font-semibold">Pagina niet gevonden</h1>
            <p className="text-fd-muted-foreground">
              De pagina die je zoekt bestaat niet (meer). Mogelijk is de link
              verouderd of bevat de URL een typefout.
            </p>
            <Link
              href="/"
              className="mt-2 rounded-lg bg-fd-primary px-4 py-2 text-sm font-medium text-fd-primary-foreground hover:opacity-90"
            >
              Terug naar home
            </Link>
          </div>
        </Provider>
      </body>
    </html>
  );
}
