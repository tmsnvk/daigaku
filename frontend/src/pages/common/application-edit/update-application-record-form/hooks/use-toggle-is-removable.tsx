/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseMutateFunction, UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

/* logic imports */
import { applicationStudentService } from '@daigaku/services';

/* configuration, utilities, constants imports */
import { mutationKeys, queryKeys } from '@daigaku/configuration';

/* interface, type, enum, schema imports */
import { ApplicationRecord } from '@daigaku/common-types';

/**
 * Defines the return value properties for handling the toggling of a removable state.
 */
interface HandleToggleIsRemovable {
  readonly shouldBeRemoved: boolean;
  readonly errorMessage: string;
  readonly isSubmitting: boolean;
  readonly isError: boolean;
  mutate: UseMutateFunction<void, Error, void, unknown>;
}

/**
 * Manages toggling the user's delete request by updating the `isRemovable` status of an {@link ApplicationRecord}.
 *
 * @param applicationUuid The application record's uuid for identification purposes.
 * @param isRemovable The application record's current is_removable boolean state.
 * @return {SimpleQueryResult<HandleToggleIsRemovable>}
 */
export const useToggleIsRemovable = (applicationUuid: string, isRemovable: boolean): HandleToggleIsRemovable => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const [shouldBeRemoved, setShouldBeRemoved] = useState<boolean>(isRemovable);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const mutation: UseMutationResult<void, AxiosError<Error>, void> = useMutation({
    mutationKey: [mutationKeys.application.IS_REMOVABLE],
    mutationFn: () => applicationStudentService.toggleIsRemovable(applicationUuid),
    onSuccess: () => {
      queryClient.setQueryData<Array<ApplicationRecord>>([queryKeys.application.GET_ALL_BY_ROLE], (applications) => {
        if (!applications) {
          return;
        }

        const currentApplication: ApplicationRecord = applications.filter((application: ApplicationRecord) => {
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
