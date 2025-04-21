/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { UseFormSetError } from 'react-hook-form';

/* logic imports */
import { accountService } from '@daigaku/services';

/* configuration, utilities, constants imports */
import { mutationKeys } from '@daigaku/configuration';
import { errorConstants } from '@daigaku/constants';

/* interface, type, enum imports */
import { AccountResetPayload, CoreErrorResponse } from '@daigaku/common-types';

/**
 * Manages the password reset form submission.
 *
 * @param setError A `react-hook-form` method that sets form errors.
 * @param showModal A method that displays a confirmation modal component.
 * @return {UseMutationResult<void, AxiosError<CoreErrorResponse>, AccountResetPayload>}
 */
export const useResetFormMutation = (
  setError: UseFormSetError<AccountResetPayload>,
  showModal: () => void,
): UseMutationResult<void, AxiosError<CoreErrorResponse>, AccountResetPayload> => {
  return useMutation({
    mutationKey: [mutationKeys.account.POST_RESET_FORM],
    mutationFn: (formData: AccountResetPayload) => accountService.resetPassword(formData),
    onSuccess: () => {
      showModal();
    },
    onError: (error: AxiosError<CoreErrorResponse>) => {
      if (axios.isAxiosError(error)) {
        const status: number | undefined = error.response?.data.errorCode;

        if (status) {
          if (status >= 500) {
            setError('root', { message: errorConstants.UNEXPECTED_SERVER_ERROR });
          }
        }
      } else {
        setError('root', { message: errorConstants.UNEXPECTED_GLOBAL_ERROR });
      }
    },
  });
};
