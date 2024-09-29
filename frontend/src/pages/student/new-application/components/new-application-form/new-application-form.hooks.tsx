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
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { UseFormSetError } from 'react-hook-form';

/* logic imports */
import { applicationStudentService } from '@services/index';

/* configuration, utilities, constants imports */
import { mutationKeys, queryClient, queryKeys } from '@configuration';
import { UNEXPECTED_GLOBAL_ERROR, UNEXPECTED_SERVER_ERROR } from '@constants';

/* interface, type, enum imports */
import { Application, MutationResult, ServerValidationErrorResponse } from '@common-types';

/**
 * ===============
 * Custom Hook {@link useCreateApplication}
 * ===============
 */

/* interfaces, types, enums */
export interface CreateApplicationFormFields {
  readonly countryUuid: string;
  readonly universityUuid: string;
  readonly courseName: string;
  readonly minorSubject: string;
  readonly programmeLength: number;
}

interface CreateApplicationForm {
  setError: UseFormSetError<CreateApplicationFormFields>;
  resetCountrySelection: () => void;
  reset: () => void;
}

type CreateApplicationFormErrorT = 'root' | 'countryUuid' | 'universityUuid' | 'courseName' | 'minorSubject' | 'programmeLength';

export type CreateApplication = MutationResult<Application, AxiosError<Array<ServerValidationErrorResponse>>, CreateApplicationFormFields>;

/**
 * @description
 * The custom hook manages the submission of new application submission via the `react-query` package.
 *
 * @param {Function} params.setError
 * Function to set validation errors for form fields.
 * @param {Function} params.resetCountrySelection
 * Function to reset the country selection in the form.
 * @param {Function} params.reset
 * A `react-hook-form` method to reset the entire form.
 *
 * @returns {CreateApplication}
 * A `react-query` mutation object.
 *
 * @since 0.0.1
 */
export const useCreateApplication = ({ setError, resetCountrySelection, reset }: CreateApplicationForm): CreateApplication => {
  return useMutation({
    mutationKey: [mutationKeys.application.POST_BY_STUDENT],
    mutationFn: (formData: CreateApplicationFormFields) => applicationStudentService.postByStudent(formData),
    onSuccess: (response: Application) => {
      queryClient.setQueryData<Array<Application>>(
        [queryKeys.application.GET_ALL_BY_ROLE],
        (applications: Array<Application> | undefined) => {
          if (!applications) {
            return;
          }

          return [...applications, response];
        },
      );

      resetCountrySelection();
      reset();
    },
    onError: (error: AxiosError<Array<ServerValidationErrorResponse>>) => {
      if (axios.isAxiosError(error)) {
        const status: number | undefined = error.response?.status;
        const errors: Array<ServerValidationErrorResponse> | undefined = error.response?.data;

        if (status) {
          if (status === 400 && errors) {
            errors.forEach((error: ServerValidationErrorResponse) => {
              if (error.fieldName) {
                setError(error.fieldName as CreateApplicationFormErrorT, { message: error.errorMessage });
              }
            });
          } else if (status >= 500) {
            setError('root', { message: UNEXPECTED_SERVER_ERROR });
          }
        }
      } else {
        setError('root', { message: UNEXPECTED_GLOBAL_ERROR });
      }
    },
  });
};

/**
 * ===============
 * Custom Hook {@link useCountrySelection}
 * ===============
 */

/* interfaces, types, enums */
export interface CountrySelection {
  selectCountry: (countryUuid: string) => void;
  resetCountrySelection: () => void;
  isCountrySelected: boolean;
  currentCountryUuid: string;
}

/**
 * @description
 * The custom hook manages the state of country selection. It tracks whether a country has been selected and stores the currently selected country's UUID.
 *
 * @returns {CountrySelection} An object containing:
 * - `isCountrySelected` - Indicates if a country is selected.
 * - `currentCountryUuid` - UUID of the currently selected country.
 * - `selectCountry` - A function to update the selected country using a given UUID.
 * - `resetCountrySelection` - A function to reset the country selection status.
 *
 * @since 0.0.1
 */
export const useCountrySelection = (): CountrySelection => {
  const [isCountrySelected, setIsCountrySelected] = useState<boolean>(false);
  const [currentCountryUuid, setCurrentCountryUuid] = useState<string>('');

  const selectCountry = (countryUuid: string): void => {
    setIsCountrySelected(true);
    setCurrentCountryUuid(countryUuid);
  };

  const resetCountrySelection = (): void => {
    setIsCountrySelected(false);
  };

  return {
    resetCountrySelection,
    selectCountry,
    isCountrySelected,
    currentCountryUuid,
  };
};
