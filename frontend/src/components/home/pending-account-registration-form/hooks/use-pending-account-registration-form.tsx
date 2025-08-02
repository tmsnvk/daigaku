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
import { pendingAccountService } from '@daigaku/services';
import { apiClient } from '@daigaku/utilities';

/* configuration, constants imports */
import { mutationKeys } from '@daigaku/constants';

/* interface, type imports */
import { CreatePendingAccountPayload } from '@daigaku/common-types';

/**
 * Manages the pending account registration form submission.
 *
 * @param setError A `react-hook-form` method that sets form errors.
 * @return {UseMutationResult<void, CoreApiError, CreatePendingAccountPayload>}
 */
export const usePendingAccountRegistrationForm = (
  setError: UseFormSetError<CreatePendingAccountPayload>,
  resetForm: () => void,
): UseMutationResult<void, CoreApiError, CreatePendingAccountPayload> => {
  const { t } = useTranslation();

  const { createToast } = useToastProvider();

  return useCoreApiMutation(
    [mutationKeys.account.POST_REGISTER_FORM],
    (formData: CreatePendingAccountPayload) => pendingAccountService.create(formData),
    {
      onSuccess: () => {
        resetForm();

        createToast({
          title: t('app.generic.toast.successToastTitle'),
          description: t('app.page.root.pendingAccountRegistration.toast.successfulFormSubmissionBody'),
          variantIntent: 'success',
        });
      },
      onError: (error: CoreApiError) => {
        apiClient.errorWrapper(error, setError);
      },
    },
  );
};
