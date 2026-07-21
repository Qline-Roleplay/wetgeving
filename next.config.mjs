import { createMDX } from 'fumadocs-mdx/next';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const withMDX = createMDX();
const dirname = path.dirname(fileURLToPath(import.meta.url));

// GitHub Pages always serves a project repo at /<repo-name>/ — this can't be
// pointed at an arbitrary subpath, so this must match the actual repo name.
const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? '/wetgeving' : '';
const assetPrefix = isProd ? 'https://qline-roleplay.github.io/wetgeving/' : '';

/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix,
  turbopack: {
    root: dirname,
  },
  env: {
    // The static search client hits an absolute '/api/search' path by
    // default, which 404s once basePath is non-empty — expose it here so
    // the client component can prefix the request correctly.
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default withMDX(config);
