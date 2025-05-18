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
import { useToastContext } from '@daigaku/context';
import { accountService } from '@daigaku/services';

/* configuration, utilities, constants imports */
import { mutationKeys } from '@daigaku/configuration';

/* interface, type, enum, schema imports */
import { AccountResetPayload, CoreErrorResponse } from '@daigaku/common-types';

/**
 * Manages the password reset form submission.
 *
 * @param setError A `react-hook-form` method that sets form errors.
 * @return {UseMutationResult<void, AxiosError<CoreErrorResponse>, AccountResetPayload>}
 */
export const useResetAccountPasswordFormMutation = (
  setError: UseFormSetError<AccountResetPayload>,
): UseMutationResult<void, AxiosError<CoreErrorResponse>, AccountResetPayload> => {
  const { t } = useTranslation();

  const { createToast } = useToastContext();

  return useMutation({
    mutationKey: [mutationKeys.account.POST_RESET_FORM],
    mutationFn: (formData: AccountResetPayload) => accountService.resetPassword(formData),
    onSuccess: () => {
      createToast({
        title: t('genericSuccessToastTitle'),
        description: t('resetPasswordRegistrationFormSubmissionToastDescription'),
        variantIntent: 'success',
      });
    },
    onError: (error: AxiosError<CoreErrorResponse>) => {
      if (axios.isAxiosError(error)) {
        const status: number | undefined = error.response?.data.errorCode;

        if (status) {
          if (status >= 500) {
            setError('root', { message: t('unexpectedServerError') });
          }
        }
      } else {
        setError('root', { message: t('unexpectedServerError') });
      }
    },
  });
};
