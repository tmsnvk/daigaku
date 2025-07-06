/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { QueryClientProvider } from '@tanstack/react-query';
import { JSX } from 'react';

/* logic imports */
import { useCoreQueryClient } from '@daigaku/hooks';
import { AuthenticationProvider, ToastProvider, TranslationProvider } from '@daigaku/providers';

/* component imports */
import { Router } from './daigaku-router';

const DaigakuApplicationWithQueryClient = (): JSX.Element => {
  const queryClient = useCoreQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthenticationProvider>
        <Router />
      </AuthenticationProvider>
    </QueryClientProvider>
  );
};

export const DaigakuReactApplication = (): JSX.Element => {
  return (
    <TranslationProvider>
      <ToastProvider>
        <DaigakuApplicationWithQueryClient />
      </ToastProvider>
    </TranslationProvider>
  );
};
