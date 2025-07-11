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
import { ConstraintViolationError, CoreApiError, MethodArgumentNotValidError } from '@daigaku/errors';
import { useToastProvider } from '@daigaku/providers';
import { applicationStudentService } from '@daigaku/services';
import { CreateApplicationSchemaKey } from '../schema.ts';

/* configuration, constants imports */
import { mutationKeys, queryKeys } from '@daigaku/constants';

/* interface, type imports */
import { ApplicationResponse, CreateApplicationByStudentPayload, InputViolation } from '@daigaku/common-types';

/**
 * Manages the submission of new application submission via the `react-query` package.
 *
 * @param setError A function to set validation errors for form fields.
 * @param resetCountrySelection A function to reset the country selection in the form.
 * @param reset A `react-hook-form` method to reset the entire form.
 * @return {UseMutationResult<ApplicationResponse, CoreApiError, CreateApplicationByStudentPayload>}
 */
export const useCreateApplication = (
  setError: UseFormSetError<CreateApplicationByStudentPayload>,
  resetCountrySelection: () => void,
  reset: () => void,
): UseMutationResult<ApplicationResponse, CoreApiError, CreateApplicationByStudentPayload> => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { createToast } = useToastProvider();

  return useMutation({
    mutationKey: [mutationKeys.application.POST_BY_STUDENT],
    mutationFn: (formData: CreateApplicationByStudentPayload) => {
      return applicationStudentService.create(formData);
    },
    onSuccess: (response: ApplicationResponse) => {
      queryClient.setQueryData<Array<ApplicationResponse>>(
        [queryKeys.application.GET_ALL_BY_ROLE],
        (applications: Array<ApplicationResponse> | undefined) => {
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
        description: t('createApplicationFormSubmissionToastDescription'),
        variantIntent: 'success',
      });
    },
    onError: (error: CoreApiError) => {
      if (error instanceof MethodArgumentNotValidError || error instanceof ConstraintViolationError) {
        error.coreError?.errors.forEach((errorDetail: InputViolation) => {
          if (errorDetail.fieldName) {
            setError(errorDetail.fieldName as CreateApplicationSchemaKey, { message: errorDetail.errorMessage });
          }
        });
      }
    },
  });
};
