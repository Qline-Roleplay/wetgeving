'use client';
import SearchDialog from '@/components/search';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { type ReactNode } from 'react';

export function Provider({ children }: { children: ReactNode }) {
  return (
    <RootProvider
      search={{ SearchDialog }}
      i18n={{ locale: 'nl', locales: [{ locale: 'nl', name: 'Nederlands' }] }}
    >
      {children}
    </RootProvider>
  );
}
