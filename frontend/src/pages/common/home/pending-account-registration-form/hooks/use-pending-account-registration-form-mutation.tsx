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
import { useToastContext } from '@daigaku/context';
import { DataIntegrityViolationError, FormValidationError, ServerError, UnexpectedError } from '@daigaku/errors';
import { pendingAccountService } from '@daigaku/services'; /* configuration, utilities, constants imports */
import { mutationKeys } from '@daigaku/constants';

/* interface, type imports */
import { CoreInputErrorResponse, CreatePendingAccountPayload, InputViolation } from '@daigaku/common-types';

/**
 * Defines the {@link usePendingAccountRegistrationFormMutation} custom hook's error types.
 */
type RegistrationFormErrorField = 'firstName' | 'lastName' | 'email' | 'institutionUuid' | 'accountRoleUuid';

/**
 * Manages the pending account registration form submission.
 *
 * @param setError A `react-hook-form` method that sets form errors.
 * @return {UseMutationResult<void, FormValidationError | ServerError | UnexpectedError,
 *   CreatePendingAccountPayload>}
 */
export const usePendingAccountRegistrationFormMutation = (
  setError: UseFormSetError<CreatePendingAccountPayload>,
): UseMutationResult<
  void,
  FormValidationError | DataIntegrityViolationError | ServerError | UnexpectedError,
  CreatePendingAccountPayload
> => {
  const { t } = useTranslation();

  const { createToast } = useToastContext();

  return useMutation({
    mutationKey: [mutationKeys.account.POST_REGISTER_FORM],
    mutationFn: (formData: CreatePendingAccountPayload) => pendingAccountService.create(formData),
    onSuccess: () => {
      createToast({
        title: t('genericSuccessToastTitle'),
        description: t('pendingAccountRegistrationFormSubmissionToastDescription'),
        variantIntent: 'success',
      });
    },
    onError: (error: FormValidationError | DataIntegrityViolationError | ServerError | UnexpectedError) => {
      const coreErrorResponse: CoreInputErrorResponse | undefined = error.coreError;

      if (error instanceof FormValidationError) {
        coreErrorResponse?.errors.forEach((errorDetail: InputViolation) => {
          if (errorDetail.fieldName) {
            setError(errorDetail.fieldName as RegistrationFormErrorField, { message: errorDetail.errorMessage });
          }
        });
      }

      if (error instanceof DataIntegrityViolationError) {
        setError('root', { message: coreErrorResponse?.errors[0].errorMessage });
      }
    },
  });
};
