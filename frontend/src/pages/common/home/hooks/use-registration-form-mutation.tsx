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
import { pendingAccountService } from '@services';

/* configuration, utilities, constants imports */
import { mutationKeys } from '@configuration';
import { errorConstants } from '@constants';

/* interface, type, enum imports */
import { CoreErrorResponse, ErrorDetail, PendingAccountRegisterRequest } from '@common-types';

/**
 * Defines the {@link useRegistrationFormMutation} custom hook's error types.
 */
type RegistrationFormErrorT = 'root' | 'firstName' | 'lastName' | 'email' | 'institutionUuid' | 'accountRoleUuid';

/**
 * Manages the component's form submission.
 *
 * @param setError A `react-hook-form` method that sets form errors.
 * @param showModal A method that displays a confirmation modal component.
 * @return {UseMutationResult<void, AxiosError<CoreErrorResponse>, PendingAccountRegisterRequest>}
 */
export const useRegistrationFormMutation = (
  setError: UseFormSetError<PendingAccountRegisterRequest>,
  showModal: () => void,
): UseMutationResult<void, AxiosError<CoreErrorResponse>, PendingAccountRegisterRequest> => {
  return useMutation({
    mutationKey: [mutationKeys.account.POST_REGISTER],
    mutationFn: (formData: PendingAccountRegisterRequest) => pendingAccountService.register(formData),
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
