/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseMutationResult } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

/* logic imports */
import { CoreApiError } from '@daigaku/errors';
import { useCoreApiMutation } from '@daigaku/hooks';
import { useToastProvider } from '@daigaku/providers';
import { accountService } from '@daigaku/services';
import { apiClient } from '@daigaku/utilities';

/* configuration, constants imports */
import { mutationKeys } from '@daigaku/constants';

/* interface, type imports */
import { LoginPayload, PasswordResetPayload } from '@daigaku/common-types';

/**
 * Manages the password reset form submission.
 *
 * @param setError The `react-hook-form` method to set form errors.
 * @return {UseMutationResult<void, CoreApiError, PasswordResetPayload>}
 */
export const useResetAccountPasswordForm = (
  setError: UseFormSetError<LoginPayload>,
): UseMutationResult<void, CoreApiError, PasswordResetPayload> => {
  const { t } = useTranslation();

  const { createToast } = useToastProvider();

  return useCoreApiMutation(
    [mutationKeys.account.POST_RESET_PASSWORD_FORM],
    (formData: PasswordResetPayload) => accountService.resetPassword(formData),
    {
      onSuccess: () => {
        createToast({
          title: t('genericSuccessToastTitle'),
          description: t('resetPasswordRegistrationFormSubmissionToastDescription'),
          variantIntent: 'success',
          autoRemoveDelay: 5000,
        });
      },
      onError: (error: CoreApiError) => {
        apiClient.errorWrapper(error, setError);
      },
    },
  );
};
