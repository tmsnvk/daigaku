/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { MutationCache, QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

/* logic imports */
// import { useToastContext } from '@daigaku/context';
/* interface, type, enum, schema imports */
import { CoreErrorResponse } from '@daigaku/common-types';

const mutationCache = new MutationCache({
  onError: (error) => {
    // const { createToast } = useToastContext();

    if (error instanceof AxiosError) {
      const status = error.response?.status;
      const errorData = error.response?.data as CoreErrorResponse | undefined;

      // if (status && status >= 400 && status < 500) {
      //
      // }

      //   if (status && status >= 500) {
      //     createToast({
      //       title: 'Server Error',
      //       description: 'Something went wrong on our end. Please try again later.',
      //       variantIntent: 'destructive',
      //     });
      //
      //     return;
      //   }
      //
      //   if (!status) {
      //     createToast({
      //       title: 'Network Error',
      //       description: 'Unable to reach the server. Please check your connection.',
      //       variantIntent: 'destructive',
      //     });
      //
      //     return;
      //   }
      // }
      //
      // createToast({
      //   title: 'Unexpected Error',
      //   description: 'An unexpected error occurred. Please try again.',
      //   variantIntent: 'destructive',
      // });
    }
  },
});

export const queryClient = new QueryClient({
  mutationCache,
  defaultOptions: {
    queries: {
      enabled: true,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  },
});
