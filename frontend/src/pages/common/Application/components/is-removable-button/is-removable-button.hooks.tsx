import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { applicationService } from '@services/index';

import {
  mutationKeys,
  queryClient,
  queryKeys,
} from '@configuration';

import { ApplicationData } from '@services/application/application.service';

const useToggleDeletionMark = (applicationUuid: string, isRemovable: boolean) => {
  const [shouldBeDeleted, setShouldBeDeleted] = useState<boolean>(isRemovable);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const mutation = useMutation({
    mutationKey: [mutationKeys.APPLICATION.IS_REMOVABLE],
    mutationFn: () => applicationService.patchByUuidToMarkForDeletion(applicationUuid),
    onSuccess: () => {
      queryClient.setQueryData<ApplicationData[]>(
        [queryKeys.APPLICATION.GET_ALL_BY_ROLE],
        (previousData) => {
          if (!previousData) {
            return;
          }

          const currentApplication = previousData.filter((row) => row.uuid === applicationUuid);

          currentApplication[0].isRemovable = !currentApplication[0].isRemovable;

          return [...previousData];
        },
      );

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

export {
  useToggleDeletionMark,
};
