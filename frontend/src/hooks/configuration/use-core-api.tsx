/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import {
  MutationKey,
  QueryKey,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
  useMutation,
  useQuery,
} from '@tanstack/react-query';

/**
 *
 */
export const useCoreApiQuery = <TData, TError>(
  queryKey: QueryKey,
  queryFn: () => Promise<TData>,
  options?: Omit<UseQueryOptions<TData, TError, TData, QueryKey>, 'queryKey' | 'queryFn'>,
): UseQueryResult<TData, TError> => {
  return useQuery({
    queryKey,
    queryFn,
    ...options,
  });
};

/**
 *
 * @param mutationKey
 * @param mutationFn
 * @param options
 * @returns {UseMutationResult<TData, TError, TPayload>}
 */
export const useCoreApiMutation = <TData, TError, TPayload>(
  mutationKey: MutationKey,
  mutationFn: (variables: TPayload) => Promise<TData>,
  options?: UseMutationOptions<TData, TError, TPayload>,
): UseMutationResult<TData, TError, TPayload> => {
  return useMutation({
    mutationKey,
    mutationFn,
    ...options,
  });
};
