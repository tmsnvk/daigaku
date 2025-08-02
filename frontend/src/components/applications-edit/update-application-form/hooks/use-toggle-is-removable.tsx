/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseMutateFunction, UseMutationResult, useMutation } from '@tanstack/react-query';
import { useState } from 'react';

/* logic imports */
import { CoreApiError } from '@daigaku/errors';
import { useCoreQueryClient } from '@daigaku/hooks';
import { applicationStudentService } from '@daigaku/services';

/* configuration, constants imports */
import { mutationKeys, queryKeys } from '@daigaku/constants';

/* interface, type imports */

/**
 * Defines the return value properties for handling the toggling of a removable state.
 */
interface HandleToggleIsRemovable {
  readonly shouldBeRemoved: boolean;
  readonly isSubmitting: boolean;
  readonly isError: boolean;
  mutate: UseMutateFunction<void, CoreApiError, void, unknown>;
}

/**
 * Manages toggling the user's delete request by updating the `isRemovable` status of an Application.
 *
 * @param applicationUuid The application record's uuid for identification purposes.
 * @param isRemovable The application record's current is_removable boolean state.
 * @return {HandleToggleIsRemovable}
 */
export const useToggleIsRemovable = (applicationUuid: string, isRemovable: boolean): HandleToggleIsRemovable => {
  const queryClient = useCoreQueryClient();

  const [shouldBeRemoved, setShouldBeRemoved] = useState<boolean>(isRemovable);

  const mutation: UseMutationResult<void, CoreApiError, void> = useMutation({
    mutationKey: [mutationKeys.application.IS_REMOVABLE],
    mutationFn: () => applicationStudentService.toggleSoftDelete(applicationUuid),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [queryKeys.application.GET_ALL_BY_ROLE] });

      setShouldBeRemoved(!shouldBeRemoved);
    },
  });

  return {
    shouldBeRemoved,
    isSubmitting: mutation.isPending,
    isError: mutation.isError,
    mutate: mutation.mutate,
  };
};
