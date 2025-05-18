/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { UseFormSetError } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

/* logic imports */
import { applicationStudentService } from '@daigaku/services';

/* configuration, utilities, constants imports */
import { mutationKeys, queryClient, queryKeys } from '@daigaku/configuration';

/* interface, type, enum, schema imports */
import {
  ApplicationRecord,
  CoreErrorResponse,
  CreateApplicationRecordByStudentPayload,
  ErrorDetail,
} from '@daigaku/common-types';
import { useToastContext } from '@daigaku/context';

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
 * @return {UseMutationResult<ApplicationRecord, AxiosError<CoreErrorResponse>,
 *   CreateApplicationRecordByStudentPayload>} A
 *   `react-query` mutation object.
 */
export const useCreateApplication = (
  setError: UseFormSetError<CreateApplicationRecordByStudentPayload>,
  resetCountrySelection: () => void,
  reset: () => void,
): UseMutationResult<ApplicationRecord, AxiosError<CoreErrorResponse>, CreateApplicationRecordByStudentPayload> => {
  const { t } = useTranslation();

  const { createToast } = useToastContext();

  return useMutation({
    mutationKey: [mutationKeys.application.POST_BY_STUDENT],
    mutationFn: (formData: CreateApplicationRecordByStudentPayload) =>
      applicationStudentService.postByStudent(formData),
    onSuccess: (response: ApplicationRecord) => {
      queryClient.setQueryData<Array<ApplicationRecord>>(
        [queryKeys.application.GET_ALL_BY_ROLE],
        (applications: Array<ApplicationRecord> | undefined) => {
          if (!applications) {
            return;
          }

          return [...applications, response];
        },
      );

      resetCountrySelection();
      reset();

      createToast({
        title: t('genericSuccessToastTitle'),
        description: t('createApplicationRecordFormSubmissionToastDescription'),
        variantIntent: 'success',
      });
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
            setError('root', { message: t('unexpectedServerError') });
          }
        }
      } else {
        setError('root', { message: t('unexpectedServerError') });
      }
    },
  });
};
