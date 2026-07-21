import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { CategorieBadge, Strafmaat } from './strafmaat';
import { WetTable } from './wet-table';
import { Strafcalculator } from './strafcalculator';
import { BoeteTable } from './boete-table';
import { Boetecalculator } from './boetecalculator';
import type { MDXComponents } from 'mdx/types';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Step,
    Steps,
    Strafmaat,
    CategorieBadge,
    WetTable,
    Strafcalculator,
    BoeteTable,
    Boetecalculator,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
