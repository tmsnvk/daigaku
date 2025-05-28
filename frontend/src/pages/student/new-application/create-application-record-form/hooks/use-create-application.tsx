/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

/* logic imports */
import { useToastContext } from '@daigaku/context';
import { applicationStudentService } from '@daigaku/services';
import { FormValidationError, ServerError, UnauthorizedError, UnexpectedError } from '@daigaku/errors';

/* configuration, utilities, constants imports */
import { mutationKeys, queryKeys } from '@daigaku/configuration';

/* interface, type, enum, schema imports */
import { ApplicationRecord, CreateApplicationRecordByStudentPayload, ErrorDetail } from '@daigaku/common-types';

/**
 * Defines the {@link useCreateApplication} custom hook's error types.
 */
type CreateApplicationFormErrorField =
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
 * @return {UseMutationResult<ApplicationRecord, UnauthorizedError | FormValidationError | ServerError |
 *   UnexpectedError, CreateApplicationRecordByStudentPayload>}
 */
export const useCreateApplication = (
  setError: UseFormSetError<CreateApplicationRecordByStudentPayload>,
  resetCountrySelection: () => void,
  reset: () => void,
): UseMutationResult<
  ApplicationRecord,
  UnauthorizedError | FormValidationError | ServerError | UnexpectedError,
  CreateApplicationRecordByStudentPayload
> => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

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
    onError: (error: UnauthorizedError | FormValidationError | ServerError | UnexpectedError) => {
      if (error instanceof FormValidationError) {
        error.coreError?.errors.forEach((errorDetail: ErrorDetail) => {
          if (errorDetail.fieldName) {
            setError(errorDetail.fieldName as CreateApplicationFormErrorField, { message: errorDetail.errorMessage });
          }
        });
      }
    },
  });
};
