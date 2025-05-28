/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { UseFormSetError } from 'react-hook-form';

/* logic imports */
import { useToastContext } from '@daigaku/context';
import { FormValidationError, ServerError, UnexpectedError } from '@daigaku/errors';
import { accountService } from '@daigaku/services';

/* configuration, utilities, constants imports */
import { mutationKeys } from '@daigaku/configuration';

/* interface, type, enum, schema imports */
import { AccountPasswordResetPayload, ErrorDetail, LoginPayload } from '@daigaku/common-types';

/**
 * Defines the {@link useResetAccountPasswordFormMutation} custom hook's error types.
 */
type AccountPasswordResetErrorField = 'email';

/**
 * Manages the password reset form submission.
 *
 * @param setError The `react-hook-form` method to set form errors.
 * @return {UseMutationResult<void, FormValidationError | ServerError | UnexpectedError, AccountPasswordResetPayload>}
 */
export const useResetAccountPasswordFormMutation = (
  setError: UseFormSetError<LoginPayload>,
): UseMutationResult<void, FormValidationError | ServerError | UnexpectedError, AccountPasswordResetPayload> => {
  const { t } = useTranslation();

  const { createToast } = useToastContext();

  return useMutation({
    mutationKey: [mutationKeys.account.POST_RESET_PASSWORD_FORM],
    mutationFn: (formData: AccountPasswordResetPayload) => accountService.resetPassword(formData),
    onSuccess: () => {
      createToast({
        title: t('genericSuccessToastTitle'),
        description: t('createCommentFormSubmissionToastDescription'),
        variantIntent: 'success',
      });
    },
    onError: (error: FormValidationError | ServerError | UnexpectedError) => {
      if (error instanceof FormValidationError) {
        error.coreError?.errors.forEach((errorDetail: ErrorDetail) => {
          if (errorDetail.fieldName) {
            setError(errorDetail.fieldName as AccountPasswordResetErrorField, { message: errorDetail.errorMessage });
          }
        });
      }
    },
  });
};
