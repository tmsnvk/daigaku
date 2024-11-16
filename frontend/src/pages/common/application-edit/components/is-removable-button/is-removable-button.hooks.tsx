/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

/* external imports */
import { UseMutateFunction, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';

/* logic imports */
import { applicationStudentService } from '@services/index';

/* configuration, utilities, constants imports */
import { mutationKeys, queryClient, queryKeys } from '@configuration';
import { UNEXPECTED_GLOBAL_ERROR } from '@constants';

/* interface, type, enum imports */
import { Application, MutationResult } from '@common-types';

/**
 * ===============
 * Custom Hook {@link useToggleIsRemovable}
 * ===============
 */

/**
 * Defines the return value properties of the {@link useToggleIsRemovable} custom hook.
 *
 * @since 0.0.1
 */
export interface HandleToggleIsRemovable {
  shouldBeRemoved: boolean;
  errorMessage: string;
  isPending: boolean;
  isError: boolean;
  mutate: UseMutateFunction<void, Error, void, unknown>;
}

/**
 * Manages toggling the user's delete request by updating the `isRemovable` status of an {@link Application}.
 *
 * @param applicationUuid The application's uuid for identification purposes.
 * @param isRemovable The application's current is_removable boolean state.
 * @return {SimpleQueryResult<HandleToggleIsRemovable>}
 *
 * @since 0.0.1
 */
export const useToggleIsRemovable = (applicationUuid: string, isRemovable: boolean): HandleToggleIsRemovable => {
  // Tracks if the application should be removed.
  const [shouldBeRemoved, setShouldBeRemoved] = useState<boolean>(isRemovable);

  // Holds any error message from mutation failure
  const [errorMessage, setErrorMessage] = useState<string>('');

  const mutation: MutationResult<void, AxiosError<Error>, void> = useMutation({
    mutationKey: [mutationKeys.application.IS_REMOVABLE],
    mutationFn: () => applicationStudentService.toggleIsRemovable(applicationUuid),
    onSuccess: () => {
      // Finds the current application by uuid in the local `react-query` cache and toggles its `isRemovable` status.
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
      setErrorMessage(UNEXPECTED_GLOBAL_ERROR);
    },
  });

  return {
    shouldBeRemoved,
    errorMessage,
    isPending: mutation.isPending,
    isError: mutation.isError,
    mutate: mutation.mutate,
  };
};
