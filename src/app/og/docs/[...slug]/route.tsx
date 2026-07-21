import { getPageImage, source } from '@/lib/source';
import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';
import { generate as DefaultImage } from 'fumadocs-ui/og';
import { appName } from '@/lib/shared';
import fs from 'node:fs';
import path from 'node:path';

export const revalidate = false;

const logoDataUri = `data:image/png;base64,${fs
  .readFileSync(path.join(process.cwd(), 'public', 'logo.png'))
  .toString('base64')}`;

export async function GET(_req: Request, { params }: RouteContext<'/og/docs/[...slug]'>) {
  const { slug } = await params;
  const page = source.getPage(slug.slice(0, -1));
  if (!page) notFound();

  return new ImageResponse(
    (
      <DefaultImage
        title={page.data.title}
        description={page.data.description}
        site={appName}
        icon={<img src={logoDataUri} width={56} height={56} />}
        primaryColor="hsl(226, 83%, 58%)"
        primaryTextColor="hsl(226, 83%, 68%)"
      />
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    lang: page.locale,
    slug: getPageImage(page).segments,
  }));
}
