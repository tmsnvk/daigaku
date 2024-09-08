/**
 * @prettier
 */

/* external imports */
import { UseMutateFunction, useMutation } from '@tanstack/react-query';
import { useState } from 'react';

/* service imports */
import { applicationStudentService } from '@services/application/application-student.service';

/* configuration imports */
import { mutationKeys, queryClient, queryKeys } from '@configuration';

/* interface, type, enum imports */
import { Application } from '@common-types';

/* interfaces, types, enums */
export interface ToggleIsRemovable {
  shouldBeDeleted: boolean;
  errorMessage: string;
  isPending: boolean;
  mutate: UseMutateFunction<void, Error, void, unknown>;
}

/*
 * custom hook - TODO - add functionality description
 */
export const useToggleIsRemovable = (applicationUuid: string, isRemovable: boolean): ToggleIsRemovable => {
  const [shouldBeDeleted, setShouldBeDeleted] = useState<boolean>(isRemovable);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const mutation = useMutation({
    mutationKey: [mutationKeys.APPLICATION.IS_REMOVABLE],
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
