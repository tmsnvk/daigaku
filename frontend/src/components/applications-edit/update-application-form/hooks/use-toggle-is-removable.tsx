/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseMutateFunction, UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

/* logic imports */
import { CoreApiError } from '@daigaku/errors';
import { applicationStudentService } from '@daigaku/services';

/* configuration, constants imports */
import { mutationKeys, queryKeys } from '@daigaku/constants';

/* interface, type imports */
import { Application } from '@daigaku/common-types';

/**
 * Defines the return value properties for handling the toggling of a removable state.
 */
interface HandleToggleIsRemovable {
  readonly shouldBeRemoved: boolean;
  readonly errorMessage: string;
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
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const [shouldBeRemoved, setShouldBeRemoved] = useState<boolean>(isRemovable);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const mutation: UseMutationResult<void, CoreApiError, void> = useMutation({
    mutationKey: [mutationKeys.application.IS_REMOVABLE],
    mutationFn: () => applicationStudentService.toggleSoftDeleteFlag(applicationUuid),
    onSuccess: () => {
      queryClient.setQueryData<Array<Application>>([queryKeys.application.GET_ALL_BY_ROLE], (applications) => {
        if (!applications) {
          return;
        }

        const currentApplication: Application = applications.filter((application: Application) => {
          return application.uuid === applicationUuid;
        })[0];

        currentApplication.isRemovable = !currentApplication.isRemovable;

        return [...applications];
      });

      setShouldBeRemoved(!shouldBeRemoved);

      history.replaceState('', `/applications/view/${applicationUuid}`);
    },
    onError: () => {
      setErrorMessage(t('unexpectedGlobalError'));
    },
  });

  return {
    shouldBeRemoved,
    errorMessage,
    isSubmitting: mutation.isPending,
    isError: mutation.isError,
    mutate: mutation.mutate,
  };
};
