import { source } from './source';

// Resolves a section's pages in the same order as its meta.json, reusing
// the exact same MDX source as the normal site — so the print view can
// never drift out of sync with the regular pages.
export function resolveSectionPages(section: string, slugs: string[]) {
  return slugs
    .map((slug) => source.getPage(slug === 'index' ? [section] : [section, slug]))
    .filter((page): page is NonNullable<typeof page> => !!page);
}
