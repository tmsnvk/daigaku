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
import { pendingAccountService } from '@daigaku/services';

/* configuration, utilities, constants imports */
import { mutationKeys } from '@daigaku/configuration';

/* interface, type, enum imports */
import { CoreErrorResponse, ErrorDetail, PendingAccountRegistrationPayload } from '@daigaku/common-types';

/**
 * Defines the {@link useRegistrationFormMutation} custom hook's error types.
 */
type RegistrationFormErrorT = 'root' | 'firstName' | 'lastName' | 'email' | 'institutionUuid' | 'accountRoleUuid';

/**
 * Manages the pending account registration form submission.
 *
 * @param setError A `react-hook-form` method that sets form errors.
 * @return {UseMutationResult<void, AxiosError<CoreErrorResponse>, PendingAccountRegistrationPayload>}
 */
export const useRegistrationFormMutation = (
  setError: UseFormSetError<PendingAccountRegistrationPayload>,
): UseMutationResult<void, AxiosError<CoreErrorResponse>, PendingAccountRegistrationPayload> => {
  const { t } = useTranslation();

  const { createToast } = useToastContext();

  return useMutation({
    mutationKey: [mutationKeys.account.POST_REGISTER],
    mutationFn: (formData: PendingAccountRegistrationPayload) => pendingAccountService.register(formData),
    onSuccess: () => {
      createToast({
        title: t('genericSuccessToastTitle'),
        description: t('pendingAccountRegistrationFormSubmissionToastDescription'),
        variantIntent: 'success',
      });
    },
    onError: (error: AxiosError<CoreErrorResponse>) => {
      if (axios.isAxiosError(error)) {
        const status: number | undefined = error.response?.status;
        const errors: CoreErrorResponse | undefined = error.response?.data;

        if (status) {
          if (status === 400 && errors) {
            errors.errors.forEach((error: ErrorDetail) => {
              if (error.fieldName) {
                setError(error.fieldName as RegistrationFormErrorT, { message: error.errorMessage });
              }
            });
          } else if (status >= 500) {
            setError('root', { message: t('unexpectedServerError') });
          }
        }
      } else {
        setError('root', { message: t('unexpectedServerError') });
      }
    },
  });
};
