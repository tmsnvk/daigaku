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
import { FormValidationError, ServerError, UnexpectedError } from '@daigaku/errors';
import { pendingAccountService } from '@daigaku/services';

/* configuration, utilities, constants imports */
import { mutationKeys } from '@daigaku/configuration';

/* interface, type, enum, schema imports */
import { CoreErrorResponse, ErrorDetail, PendingAccountRegistrationPayload } from '@daigaku/common-types';

/**
 * Defines the {@link usePendingAccountRegistrationFormMutation} custom hook's error types.
 */
type RegistrationFormErrorField = 'firstName' | 'lastName' | 'email' | 'institutionUuid' | 'accountRoleUuid';

/**
 * Manages the pending account registration form submission.
 *
 * @param setError A `react-hook-form` method that sets form errors.
 * @return {UseMutationResult<void, FormValidationError | ServerError | UnexpectedError,
 *   PendingAccountRegistrationPayload>}
 */
export const usePendingAccountRegistrationFormMutation = (
  setError: UseFormSetError<PendingAccountRegistrationPayload>,
): UseMutationResult<void, FormValidationError | ServerError | UnexpectedError, PendingAccountRegistrationPayload> => {
  const { t } = useTranslation();

  const { createToast } = useToastContext();

  return useMutation({
    mutationKey: [mutationKeys.account.POST_REGISTER_FORM],
    mutationFn: (formData: PendingAccountRegistrationPayload) => pendingAccountService.register(formData),
    onSuccess: () => {
      createToast({
        title: t('genericSuccessToastTitle'),
        description: t('pendingAccountRegistrationFormSubmissionToastDescription'),
        variantIntent: 'success',
      });
    },
    onError: (error: FormValidationError | ServerError | UnexpectedError) => {
      const coreErrorResponse: CoreErrorResponse | undefined = error.coreError;

      if (error instanceof FormValidationError) {
        coreErrorResponse?.errors.forEach((errorDetail: ErrorDetail) => {
          if (errorDetail.fieldName) {
            setError(errorDetail.fieldName as RegistrationFormErrorField, { message: errorDetail.errorMessage });
          }
        });
      }
    },
  });
};
