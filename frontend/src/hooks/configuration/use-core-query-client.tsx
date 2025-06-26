/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { MutationCache, QueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

/* logic imports */
import { CoreApiError } from '@daigaku/errors';
import { useToastProvider } from '@daigaku/providers';

/**
 *
 */
export const useCoreQueryClient = (): QueryClient => {
  const { t } = useTranslation();

  const { createToast } = useToastProvider();

  const mutationCache = useMemo(() => {
    return new MutationCache({
      onError: (error: CoreApiError) => {
        const errorToToastMap: Record<string, { title: string; description: string }> = {
          ServerError: {
            title: t('serverErrorToastTitle'),
            description: t('serverErrorToastDescription'),
          },
          UnexpectedError: {
            title: t('unexpectedErrorToastTitle'),
            description: t('unexpectedErrorToastDescription'),
          },
        };

        const toastContent = errorToToastMap[error.name];

        if (toastContent) {
          createToast({
            ...toastContent,
            variantIntent: 'destructive',
            autoRemoveDelay: 10000,
          });
        }
      },
    });
  }, [t, createToast]);

  return useMemo(
    () =>
      new QueryClient({
        mutationCache,
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            staleTime: Infinity,
          },
        },
      }),
    [mutationCache],
  );
};
