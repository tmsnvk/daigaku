/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { UseFormSetError } from 'react-hook-form';

/* logic imports */
import { applicationStudentService } from '@daigaku/services';

/* configuration, utilities, constants imports */
import { mutationKeys, queryClient, queryKeys } from '@daigaku/configuration';
import { errorConstants } from '@daigaku/constants';

/* interface, type, enum imports */
import { Application, CoreErrorResponse, CreateApplicationByStudent, ErrorDetail } from '@daigaku/common-types';

/**
 * Defines the {@link useCreateApplication} custom hook's error types.
 */
type CreateApplicationFormErrorT =
  | 'root'
  | 'countryUuid'
  | 'universityUuid'
  | 'courseName'
  | 'minorSubject'
  | 'programmeLength';

/**
 * Manages the submission of new application submission via the `react-query` package.
 *
 * @param setError A function to set validation errors for form fields.
 * @param resetCountrySelection A function to reset the country selection in the form.
 * @param reset A `react-hook-form` method to reset the entire form.
 * @return {UseMutationResult<Application, AxiosError<CoreErrorResponse>, CreateApplicationByStudent>} A `react-query`
 *   mutation object.
 */
export const useCreateApplication = (
  setError: UseFormSetError<CreateApplicationByStudent>,
  resetCountrySelection: () => void,
  reset: () => void,
): UseMutationResult<Application, AxiosError<CoreErrorResponse>, CreateApplicationByStudent> => {
  return useMutation({
    mutationKey: [mutationKeys.application.POST_BY_STUDENT],
    mutationFn: (formData: CreateApplicationByStudent) => applicationStudentService.postByStudent(formData),
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
    onError: (error: AxiosError<CoreErrorResponse>) => {
      if (axios.isAxiosError(error)) {
        const status: number | undefined = error.response?.data.errorCode;
        const errors: CoreErrorResponse | undefined = error.response?.data;

        if (status) {
          if (status === 400 && errors) {
            errors.errors.forEach((error: ErrorDetail) => {
              if (error.fieldName) {
                setError(error.fieldName as CreateApplicationFormErrorT, { message: error.errorMessage });
              }
            });
          } else if (status >= 500) {
            setError('root', { message: errorConstants.UNEXPECTED_SERVER_ERROR });
          }
        }
      } else {
        setError('root', { message: errorConstants.UNEXPECTED_GLOBAL_ERROR });
      }
    },
  });
};
