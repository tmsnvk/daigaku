/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

/* logic imports */
import { useToastContext } from '@daigaku/context';
import { CoreApiError } from '@daigaku/errors';
import { accountService } from '@daigaku/services';

/* configuration, utilities, constants imports */
import { mutationKeys } from '@daigaku/configuration';

/* interface, type, enum, schema imports */
import { AccountPasswordResetPayload } from '@daigaku/common-types';

/**
 * Manages the password reset form submission.
 *
 * @return {UseMutationResult<void, CoreApiError, AccountPasswordResetPayload>}
 */
export const useResetAccountPasswordFormMutation = (): UseMutationResult<
  void,
  CoreApiError,
  AccountPasswordResetPayload
> => {
  const { t } = useTranslation();

  const { createToast } = useToastContext();

  return useMutation({
    mutationKey: [mutationKeys.account.POST_RESET_PASSWORD_FORM],
    mutationFn: (formData: AccountPasswordResetPayload) => accountService.resetPassword(formData),
    onSuccess: () => {
      createToast({
        title: t('genericSuccessToastTitle'),
        description: t('resetPasswordRegistrationFormSubmissionToastDescription'),
        variantIntent: 'success',
      });
    },
  });
};
