/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';

/* logic imports */
import { applicationStudentService } from '@services';

/* configuration, utilities, constants imports */
import { mutationKeys, queryClient, queryKeys } from '@configuration';
import { UNEXPECTED_GLOBAL_ERROR } from '@constants';

/* interface, type, enum imports */
import { Application, MutationResult } from '@common-types';
import { HandleToggleIsRemovable } from './is-removable-button.models';

/**
 * Manages toggling the user's delete request by updating the `isRemovable` status of an {@link Application}.
 *
 * @param applicationUuid The application's uuid for identification purposes.
 * @param isRemovable The application's current is_removable boolean state.
 * @return {SimpleQueryResult<HandleToggleIsRemovable>}
 */
export const useToggleIsRemovable = (applicationUuid: string, isRemovable: boolean): HandleToggleIsRemovable => {
  const [shouldBeRemoved, setShouldBeRemoved] = useState<boolean>(isRemovable);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const mutation: MutationResult<void, AxiosError<Error>, void> = useMutation({
    mutationKey: [mutationKeys.application.IS_REMOVABLE],
    mutationFn: () => applicationStudentService.toggleIsRemovable(applicationUuid),
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
