import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import {
  mutationKeys,
  queryClient,
  queryKeys,
} from '@configuration';
import { applicationService } from '@services/index.ts';
import { ApplicationT } from '@services/application/application.service.ts';

const useToggleDeletionMark = (applicationUuid: string, isMarked: boolean) => {
  const [shouldBeDeleted, setShouldBeDeleted] = useState<boolean>(isMarked);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const mutation = useMutation({
    mutationKey: [mutationKeys.APPLICATION.IS_REMOVABLE],
    mutationFn: () => applicationService.patchByUuidToMarkForDeletion(applicationUuid),
    onSuccess: () => {
      queryClient.setQueryData<ApplicationT[]>(
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
