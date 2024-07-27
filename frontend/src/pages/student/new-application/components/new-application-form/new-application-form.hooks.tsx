import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';

import {
  mutationKeys,
  queryClient,
  queryKeys,
} from '@configuration';

import { applicationService } from '@services/index';

import { ApplicationData } from '@services/application/application.service';

export interface NewApplicationFormFields {
  readonly countryUuid: string;
  readonly universityUuid: string;
  readonly courseName: string;
  readonly minorSubject: string;
  readonly programmeLength: number;
}

interface NewApplicationForm {
  setError: UseFormSetError<NewApplicationFormFields>;
  resetCountrySelection: () => void;
  reset: () => void;
}

type NewApplicationFormErrorFields =
  `root.${string}` |
  'root' |
  'countryUuid' |
  'universityUuid' |
  'courseName' |
  'minorSubject' |
  'programmeLength';

interface NewApplicationFormError {
  response: {
    status: number;
    data: {
      [key: string]: NewApplicationFormErrorFields;
    }
  }
}

const useSubmitNewApplicationForm = ({ setError, resetCountrySelection, reset }: NewApplicationForm) => {
  return useMutation({
    mutationKey: [mutationKeys.APPLICATION.POST_BY_STUDENT],
    mutationFn: (data: NewApplicationFormFields) => applicationService.postByStudent(data),
    onSuccess: (data: ApplicationData) => {
      queryClient.setQueryData<Array<ApplicationData>>(
        [queryKeys.APPLICATION.GET_ALL_BY_ROLE],
        (previousData) => {
          if (!previousData) {
            return;
          }

          return [...previousData, data];
        },
      );

      resetCountrySelection();
      reset();
    },
    onError: (error: NewApplicationFormError) => {
      for (const fieldId in error.response.data) {
        if (error.response.data[fieldId]) {
          setError(fieldId as NewApplicationFormErrorFields, { message: error.response.data[fieldId] });
        }
      }

      if (error.response.data.root) {
        setError('root.serverError', { message: error.response.data.root });
      }
    },
  });
};

export interface CheckFieldDisableStatus {
  isCountrySelected: boolean;
  resetCountrySelection: () => void;
  handleCountrySelection: () => void;
}

const useCheckFieldDisableStatus = (): CheckFieldDisableStatus => {
  const [isCountrySelected, setIsCountrySelected] = useState<boolean>(false);

  const handleCountrySelection = (): void => {
    setIsCountrySelected(true);
  };

  const resetCountrySelection = (): void => {
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
