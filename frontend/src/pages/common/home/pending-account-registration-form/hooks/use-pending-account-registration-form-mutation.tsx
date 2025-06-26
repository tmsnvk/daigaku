/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

/* logic imports */
import {
  ConstraintViolationError,
  CoreApiError,
  DataIntegrityViolationError,
  MethodArgumentNotValidError,
} from '@daigaku/errors';
import { useToastProvider } from '@daigaku/providers';
import { pendingAccountService } from '@daigaku/services';
import { PendingAccountRegistrationSchemaFieldKey } from '../schema.ts';

/* configuration, constants imports */
import { mutationKeys } from '@daigaku/constants';

/* interface, type imports */
import { CoreInputErrorResponse, CreatePendingAccountPayload, InputViolation } from '@daigaku/common-types';

/**
 * Manages the pending account registration form submission.
 *
 * @param setError A `react-hook-form` method that sets form errors.
 * @return {UseMutationResult<void, CoreApiError, CreatePendingAccountPayload>}
 */
export const usePendingAccountRegistrationFormMutation = (
  setError: UseFormSetError<CreatePendingAccountPayload>,
  resetForm: () => void,
): UseMutationResult<void, CoreApiError, CreatePendingAccountPayload> => {
  const { t } = useTranslation();

  const { createToast } = useToastProvider();

  return useMutation({
    mutationKey: [mutationKeys.account.POST_REGISTER_FORM],
    mutationFn: (formData: CreatePendingAccountPayload) => {
      return pendingAccountService.create(formData);
    },
    onSuccess: () => {
      resetForm();

      createToast({
        title: t('genericSuccessToastTitle'),
        description: t('pendingAccountRegistrationFormSubmissionToastDescription'),
        variantIntent: 'success',
      });
    },
    onError: (error: CoreApiError) => {
      const errorResponse: CoreInputErrorResponse | undefined = error.coreError;

      if (error instanceof MethodArgumentNotValidError || error instanceof ConstraintViolationError) {
        errorResponse?.errors.forEach((errorDetail: InputViolation) => {
          if (errorDetail.fieldName) {
            setError(errorDetail.fieldName as PendingAccountRegistrationSchemaFieldKey, {
              message: errorDetail.errorMessage,
            });
          }
        });
      }

      if (error instanceof DataIntegrityViolationError) {
        setError('root', { message: errorResponse?.errors[0].errorMessage });
      }
    },
  });
};
