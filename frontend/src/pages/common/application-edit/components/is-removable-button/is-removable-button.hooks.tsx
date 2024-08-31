/**
 * @prettier
 */

/* external imports */
import { useState } from 'react';
import { UseMutateFunction, useMutation } from '@tanstack/react-query';

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
      queryClient.setQueryData<Application[]>([queryKeys.APPLICATION.GET_ALL_BY_ROLE], (previousData) => {
        if (!previousData) {
          return;
        }

        const currentApplication = previousData.filter((row) => row.uuid === applicationUuid);

        currentApplication[0].isRemovable = !currentApplication[0].isRemovable;

        return [...previousData];
      });

      setShouldBeDeleted(!shouldBeDeleted);

      history.replaceState('', `/applications/${applicationUuid}`);
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
