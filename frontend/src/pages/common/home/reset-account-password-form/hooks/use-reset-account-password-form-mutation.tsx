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
import { CoreApiError, MethodArgumentNotValidError } from '@daigaku/errors';
import { accountService } from '@daigaku/services';
import { ResetAccountPasswordSchemaFieldKey } from '../schema.ts';

/* configuration, utilities, constants imports */
import { mutationKeys } from '@daigaku/constants';

/* interface, type imports */
import { AccountPasswordResetPayload, InputViolation, LoginPayload } from '@daigaku/common-types';

/**
 * Manages the password reset form submission.
 *
 * @param setError The `react-hook-form` method to set form errors.
 * @return {UseMutationResult<void, CoreApiError, AccountPasswordResetPayload>}
 */
export const useResetAccountPasswordFormMutation = (
  setError: UseFormSetError<LoginPayload>,
): UseMutationResult<void, CoreApiError, AccountPasswordResetPayload> => {
  const { t } = useTranslation();

  const { createToast } = useToastContext();

  return useMutation({
    mutationKey: [mutationKeys.account.POST_RESET_PASSWORD_FORM],
    mutationFn: (formData: AccountPasswordResetPayload) => {
      return accountService.resetPassword(formData);
    },
    onSuccess: () => {
      createToast({
        title: t('genericSuccessToastTitle'),
        description: t('resetPasswordRegistrationFormSubmissionToastDescription'),
        variantIntent: 'success',
        autoRemoveDelay: 5000,
      });
    },
    onError: (error: CoreApiError) => {
      if (error instanceof MethodArgumentNotValidError) {
        error.coreError?.errors.forEach((errorDetail: InputViolation) => {
          if (errorDetail.fieldName) {
            setError(errorDetail.fieldName as ResetAccountPasswordSchemaFieldKey, {
              message: errorDetail.errorMessage,
            });
          }
        });
      }
    },
  });
};
