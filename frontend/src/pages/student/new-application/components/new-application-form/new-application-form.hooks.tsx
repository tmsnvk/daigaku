/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
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
import { Application, DefaultErrorResponse, ErrorDetail, MutationResult } from '@common-types';

/**
 * ===============
 * Custom Hook {@link useCreateApplication}
 * ===============
 */

/**
 * Defines the properties of a single {@link Application} submission.
 *
 * @since 0.0.1
 */
export interface CreateApplicationFormFields {
  readonly countryUuid: string;
  readonly universityUuid: string;
  readonly courseName: string;
  readonly minorSubject: string;
  readonly programmeLength: number;
}

/**
 * Defines the {@link useCreateApplication} custom hook's error types.
 *
 * @since 0.0.1
 */
type CreateApplicationFormErrorT = 'root' | 'countryUuid' | 'universityUuid' | 'courseName' | 'minorSubject' | 'programmeLength';

/**
 * Defines the {@link useCreateApplication} custom hook's return value properties.
 *
 * @since 0.0.1
 */
export type CreateApplication = MutationResult<Application, AxiosError<DefaultErrorResponse>, CreateApplicationFormFields>;

/**
 * Manages the submission of new application submission via the `react-query` package.
 *
 * @param setError A function to set validation errors for form fields.
 * @param resetCountrySelection A function to reset the country selection in the form.
 * @param reset A `react-hook-form` method to reset the entire form.
 * @return {CreateApplication} A `react-query` mutation object.
 *
 * @since 0.0.1
 */
export const useCreateApplication = (
  setError: UseFormSetError<CreateApplicationFormFields>,
  resetCountrySelection: () => void,
  reset: () => void,
): CreateApplication => {
  return useMutation({
    mutationKey: [mutationKeys.application.POST_BY_STUDENT],
    mutationFn: (formData: CreateApplicationFormFields) => applicationStudentService.postByStudent(formData),
    onSuccess: (response: Application) => {
      // After a successful submission, the newly created application is added to `react-query`'s local cache.
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
    onError: (error: AxiosError<DefaultErrorResponse>) => {
      if (axios.isAxiosError(error)) {
        const status: number | undefined = error.response?.data.errorCode;
        const errors: DefaultErrorResponse | undefined = error.response?.data;

        if (status) {
          if (status === 400 && errors) {
            errors.errors.forEach((error: ErrorDetail) => {
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

/**
 * Defines the {@link useCountrySelection} custom hook's return value properties.
 *
 * @since 0.0.1
 */
export interface CountrySelection {
  /**
   * A function to update the selected country using a given UUID.
   * @param countryUuid The to be selected country's UUID.
   */
  selectCountry: (countryUuid: string) => void;

  /**
   * A function to reset the country selection status.
   */
  resetCountrySelection: () => void;

  /**
   * Indicates if a country is selected.
   */
  isCountrySelected: boolean;

  /**
   * The currently selected country's UUID.
   */
  currentCountryUuid: string;
}

/**
 * Manages the state of country selection. It tracks whether a country has been selected and stores the currently selected country's uuid.
 *
 * @return {CountrySelection} The object that manages the country selection state.
 *
 * @since 0.0.1
 */
export const useCountrySelection = (): CountrySelection => {
  const [isCountrySelected, setIsCountrySelected] = useState<boolean>(false);
  const [currentCountryUuid, setCurrentCountryUuid] = useState<string>('');

  // Sets the selected country and marks it as selected.
  const selectCountry = (countryUuid: string): void => {
    setIsCountrySelected(true);
    setCurrentCountryUuid(countryUuid);
  };

  // Resets the selection state.
  const resetCountrySelection = (): void => {
    setIsCountrySelected(false);
  };

  return {
    isCountrySelected,
    currentCountryUuid,
    selectCountry,
    resetCountrySelection,
  };
};
