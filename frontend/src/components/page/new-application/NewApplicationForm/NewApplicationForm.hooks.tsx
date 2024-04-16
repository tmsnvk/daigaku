import { useState } from 'react';
import {
  useMutation,
} from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';
import {
  mutationKeys,
  queryClient,
  queryKeys,
} from '@configuration';
import { ApplicationT } from '@services/application/application.service.ts';
import { applicationService } from '@services/index.ts';

export type NewApplicationFormFieldsT = {
  countryUuid: string;
  universityUuid: string;
  courseName: string;
  minorSubject: string;
  programmeLength: number;
}

type NewApplicationFormT = {
  setError: UseFormSetError<NewApplicationFormFieldsT>;
  resetCountrySelection: () => void;
  reset: () => void;
};

type NewApplicationFormErrorFieldsT =
  `root.${string}` |
  'root' |
  'countryUuid' |
  'universityUuid' |
  'courseName' |
  'minorSubject' |
  'programmeLength';

type NewApplicationFormErrorT = {
  response: {
    status: number;
    data: {
      [key: string]: NewApplicationFormErrorFieldsT;
    }
  }
}

const useSubmitNewApplicationForm = ({ setError, resetCountrySelection, reset }: NewApplicationFormT) => {
  return useMutation({
    mutationKey: [mutationKeys.APPLICATION.POST_BY_STUDENT],
    mutationFn: (data: NewApplicationFormFieldsT) => applicationService.postByStudent(data),
    onSuccess: (data) => {
      const updatedCache = queryClient.setQueryData<ApplicationT[]>(
        [queryKeys.APPLICATION.GET_ALL_BY_ROLE],
        (previousData) => {
          if (!previousData) {
            return;
          }

          return { ...previousData, data: [...previousData, data.data] };
        },
      );

      resetCountrySelection();
      reset();

      return updatedCache;
    },
    onError: (error: NewApplicationFormErrorT) => {
      for (const fieldId in error.response.data) {
        if (error.response.data[fieldId]) {
          setError(fieldId as NewApplicationFormErrorFieldsT, { message: error.response.data[fieldId] });
        }
      }

      if (error.response.data.root) {
        setError('root.serverError', { message: error.response.data.root });
      }
    },
  });
};

const useCheckFieldDisableStatus = () => {
  const [isCountrySelected, setIsCountrySelected] = useState<boolean>(false);

  const handleCountrySelection = () => {
    setIsCountrySelected(true);
  };

  const resetCountrySelection = () => {
    setIsCountrySelected(false);
  };

  return {
    isCountrySelected,
    resetCountrySelection,
    handleCountrySelection,
  };
};

export {
  useSubmitNewApplicationForm,
  useCheckFieldDisableStatus,
};
