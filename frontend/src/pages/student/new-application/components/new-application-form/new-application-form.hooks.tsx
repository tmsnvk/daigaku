/**
 * @prettier
 */

/* external imports */
import { useState } from 'react';
import { UseFormSetError } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

/* configuration imports */
import { mutationKeys, queryClient, queryKeys } from '@configuration';

/* service imports */
import { applicationStudentService } from '@services/index';

/* interface, type, enum imports */
import { Application, MutationResult } from '@common-types';

/* interfaces, types, enums */
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
  | `root.${string}`
  | 'root'
  | 'countryUuid'
  | 'universityUuid'
  | 'courseName'
  | 'minorSubject'
  | 'programmeLength';

interface NewApplicationFormError {
  response: {
    status: number;
    data: {
      [key: string]: NewApplicationFormErrorFields;
    };
  };
}

export type SubmitNewApplicationForm = MutationResult<Application, NewApplicationFormError, NewApplicationFormFields>;

/*
 * custom hook - TODO - add functionality description
 */
export const useSubmitNewApplicationForm = ({ setError, resetCountrySelection, reset }: NewApplicationForm): SubmitNewApplicationForm => {
  return useMutation({
    mutationKey: [mutationKeys.APPLICATION.POST_BY_STUDENT],
    mutationFn: (data: NewApplicationFormFields) => applicationStudentService.postByStudent(data),
    onSuccess: (data: Application) => {
      queryClient.setQueryData<Array<Application>>(
        [queryKeys.APPLICATION.GET_ALL_BY_ROLE],
        (applications: Array<Application> | undefined) => {
          if (!applications) {
            return;
          }

          return [...applications, data];
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

/* interfaces, types, enums */
export interface CheckFieldDisableStatus {
  isCountrySelected: boolean;
  resetCountrySelection: () => void;
  handleCountrySelection: () => void;
}

/*
 * custom hook - TODO - add functionality description
 */
export const useCheckFieldDisableStatus = (): CheckFieldDisableStatus => {
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
