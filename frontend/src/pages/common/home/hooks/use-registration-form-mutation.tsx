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
import { pendingAccountService } from '@daigaku/services';

/* configuration, utilities, constants imports */
import { mutationKeys } from '@daigaku/configuration';
import { errorConstants } from '@daigaku/constants';

/* interface, type, enum imports */
import { CoreErrorResponse, ErrorDetail, PendingAccountRegistrationRequest } from '@daigaku/common-types';

/**
 * Defines the {@link useRegistrationFormMutation} custom hook's error types.
 */
type RegistrationFormErrorT = 'root' | 'firstName' | 'lastName' | 'email' | 'institutionUuid' | 'accountRoleUuid';

/**
 * Manages the pending account registration form submission.
 *
 * @param setError A `react-hook-form` method that sets form errors.
 * @param showModal A method that displays a confirmation modal component.
 * @return {UseMutationResult<void, AxiosError<CoreErrorResponse>, PendingAccountRegistrationRequest>}
 */
export const useRegistrationFormMutation = (
  setError: UseFormSetError<PendingAccountRegistrationRequest>,
  showModal: () => void,
): UseMutationResult<void, AxiosError<CoreErrorResponse>, PendingAccountRegistrationRequest> => {
  return useMutation({
    mutationKey: [mutationKeys.account.POST_REGISTER],
    mutationFn: (formData: PendingAccountRegistrationRequest) => pendingAccountService.register(formData),
    onSuccess: () => {
      showModal();
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
            setError('root', { message: errorConstants.UNEXPECTED_SERVER_ERROR });
          }
        }
      } else {
        setError('root', { message: errorConstants.UNEXPECTED_GLOBAL_ERROR });
      }
    },
  });
};
