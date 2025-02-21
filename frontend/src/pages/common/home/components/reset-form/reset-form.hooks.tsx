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
import { accountService } from '@services';

/* configuration, utilities, constants imports */
import { mutationKeys } from '@configuration';
import { errorConstants } from '@constants';

/* interface, type, enum imports */
import { AccountResetRequest, CoreErrorResponse } from '@common-types';

/**
 * Manages the component's form submission.
 *
 * @param setError A `react-hook-form` method that sets form errors.
 * @param showModal A method that displays a confirmation modal component.
 * @return {UseMutationResult<void, AxiosError<CoreErrorResponse>, AccountResetRequest>}
 */
export const useHandleResetForm = (
  setError: UseFormSetError<AccountResetRequest>,
  showModal: () => void,
): UseMutationResult<void, AxiosError<CoreErrorResponse>, AccountResetRequest> => {
  return useMutation({
    mutationKey: [mutationKeys.account.POST_RESET_FORM],
    mutationFn: (formData: AccountResetRequest) => accountService.resetPassword(formData),
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
