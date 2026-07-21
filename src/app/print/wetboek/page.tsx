import { source } from '@/lib/source';
import { resolveSectionPages } from '@/lib/print';
import { getMDXComponents } from '@/components/mdx';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { PrintButton } from '@/components/print-button';
import { appName } from '@/lib/shared';
import Link from 'next/link';
import type { Metadata } from 'next';
import wetboekMeta from '../../../../content/docs/wetboek/meta.json';

export const metadata: Metadata = {
  title: 'Wetboek — afdrukvriendelijke versie',
};

export default function PrintWetboekPage() {
  const pages = resolveSectionPages('wetboek', wetboekMeta.pages);

  return (
    <main className="prose dark:prose-invert mx-auto max-w-3xl px-6 py-10 print:max-w-none">
      <div className="print:hidden mb-8 flex items-center justify-between not-prose">
        <Link href="/wetboek" className="text-sm underline underline-offset-4">
          ← Terug naar het Wetboek
        </Link>
        <PrintButton />
      </div>

      <h1>{appName} — Wetboek</h1>

      {pages.map((page) => {
        const MDX = page.data.body;
        return (
          <section key={page.url} className="break-before-page">
            <h2>{page.data.title}</h2>
            <MDX components={getMDXComponents({ a: createRelativeLink(source, page) })} />
          </section>
        );
      })}
    </main>
  );
}
