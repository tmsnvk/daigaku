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
import { FormValidationError, ServerError, UnauthorizedError, UnexpectedError } from '@daigaku/errors';
import { applicationStudentService } from '@daigaku/services';
import { CreateApplicationSchemaFieldKey } from '../schema.ts';

/* configuration, utilities, constants imports */
import { mutationKeys, queryKeys } from '@daigaku/constants';

/* interface, type imports */
import { Application, CreateApplicationByStudentPayload, InputViolation } from '@daigaku/common-types';

/**
 * Manages the submission of new application submission via the `react-query` package.
 *
 * @param setError A function to set validation errors for form fields.
 * @param resetCountrySelection A function to reset the country selection in the form.
 * @param reset A `react-hook-form` method to reset the entire form.
 * @return {UseMutationResult<Application, UnauthorizedError | FormValidationError | ServerError |
 *   UnexpectedError, CreateApplicationByStudentPayload>}
 */
export const useCreateApplication = (
  setError: UseFormSetError<CreateApplicationByStudentPayload>,
  resetCountrySelection: () => void,
  reset: () => void,
): UseMutationResult<
  Application,
  UnauthorizedError | FormValidationError | ServerError | UnexpectedError,
  CreateApplicationByStudentPayload
> => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { createToast } = useToastContext();

  return useMutation({
    mutationKey: [mutationKeys.application.POST_BY_STUDENT],
    mutationFn: (formData: CreateApplicationByStudentPayload) => {
      return applicationStudentService.create(formData);
    },
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

      createToast({
        title: t('genericSuccessToastTitle'),
        description: t('createApplicationFormSubmissionToastDescription'),
        variantIntent: 'success',
      });
    },
    onError: (error: UnauthorizedError | FormValidationError | ServerError | UnexpectedError) => {
      if (error instanceof FormValidationError) {
        error.coreError?.errors.forEach((errorDetail: InputViolation) => {
          if (errorDetail.fieldName) {
            setError(errorDetail.fieldName as CreateApplicationSchemaFieldKey, { message: errorDetail.errorMessage });
          }
        });
      }
    },
  });
};
