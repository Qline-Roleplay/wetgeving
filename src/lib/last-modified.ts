import { execFileSync } from 'node:child_process';
import path from 'node:path';

// Derives "laatst bijgewerkt" from git history instead of a manually typed
// frontmatter date — a typed date drifts the moment someone forgets to bump
// it, while git log is accurate by construction. Requires full git history
// (the deploy workflow uses fetch-depth: 0); falls back to null otherwise.
export function getLastModified(relativeDocPath: string): Date | null {
  const fullPath = path.join(process.cwd(), 'content', 'docs', relativeDocPath);

  try {
    const output = execFileSync('git', ['log', '-1', '--format=%aI', '--', fullPath], {
      encoding: 'utf-8',
      cwd: process.cwd(),
    }).trim();

    return output ? new Date(output) : null;
  } catch {
    return null;
  }
}

export function formatLastModified(date: Date): string {
  return new Intl.DateTimeFormat('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
}
