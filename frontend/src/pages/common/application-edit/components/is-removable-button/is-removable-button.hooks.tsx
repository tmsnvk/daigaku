/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 */

/* external imports */
import { UseMutateFunction, useMutation } from '@tanstack/react-query';
import { useState } from 'react';

/* service imports */
import { applicationStudentService } from '@services/index';

/* configuration, utilities, constants imports */
import { mutationKeys, queryClient, queryKeys } from '@configuration';

/* interface, type, enum imports */
import { Application } from '@common-types';

/**
 * ===============
 * Custom Hook {@link useToggleIsRemovable}
 * ===============
 */

/* interfaces, types, enums */
export interface ToggleIsRemovable {
  shouldBeDeleted: boolean;
  errorMessage: string;
  isPending: boolean;
  mutate: UseMutateFunction<void, Error, void, unknown>;
}

/**
 * @description
 * The custom hook manages the toggling the user's delete request.
 *
 * @param {string} applicationUuid
 * The application's UUID for identification purposes.
 * @param {boolean} isRemovable
 * The application's current is_removable boolean state.
 *
 * @returns {SimpleQueryResult<DashboardStatistics>}
 * A `react-query` mutation object.
 *
 * @since 0.0.1
 */
export const useToggleIsRemovable = (applicationUuid: string, isRemovable: boolean): ToggleIsRemovable => {
  const [shouldBeDeleted, setShouldBeDeleted] = useState<boolean>(isRemovable);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const mutation = useMutation({
    mutationKey: [mutationKeys.application.IS_REMOVABLE],
    mutationFn: () => applicationStudentService.toggleIsRemovable(applicationUuid),
    onSuccess: () => {
      queryClient.setQueryData<Array<Application>>([queryKeys.application.GET_ALL_BY_ROLE], (applications) => {
        if (!applications) {
          return;
        }

        const currentApplications: Array<Application> = applications.filter((application: Application) => {
          return application.uuid === applicationUuid;
        });

        currentApplications[0].isRemovable = !currentApplications[0].isRemovable;

        return [...applications];
      });

      setShouldBeDeleted(!shouldBeDeleted);

      history.replaceState('', `/applications/view/${applicationUuid}`);
    },
    onError: () => {
      setErrorMessage('An error has happened. Refresh your browser and try again.');
    },
  });

  return {
    shouldBeDeleted,
    errorMessage,
    isPending: mutation.isPending,
    mutate: mutation.mutate,
  };
};
