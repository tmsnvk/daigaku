/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { UseFormSetError } from 'react-hook-form';

/* logic imports */
import { pendingAccountService } from '@services';

/* configuration, utilities, constants imports */
import { mutationKeys } from '@configuration';
import { UNEXPECTED_GLOBAL_ERROR, UNEXPECTED_SERVER_ERROR } from '@constants';

/* interface, type, enum imports */
import { CoreErrorResponse, ErrorDetail, PendingAccountRegisterRequest } from '@common-types';
import { ConfirmationModal } from '../../home.models';
import { HandleRegistrationForm } from './registration-form.models';

/**
 * Defines the {@link useSubmitRegistrationForm} custom hook's error types.
 */
type RegistrationFormErrorT = 'root' | 'firstName' | 'lastName' | 'email' | 'institutionUuid' | 'accountRoleUuid';

/**
 * Manages the {@link RegistrationForm} submission process, including REST API request, error handling, and post-success actions.
 *
 * @param setError A `react-hook-form` function to set form errors.
 * @param showModal A function to show the {@link ConfirmationModal}, used in the component.
 * @return {HandleRegistrationForm}
 */
export const useSubmitRegistrationForm = (
  setError: UseFormSetError<PendingAccountRegisterRequest>,
  showModal: ConfirmationModal['showModal'],
): HandleRegistrationForm => {
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
            setError('root', { message: UNEXPECTED_SERVER_ERROR });
          }
        }
      } else {
        setError('root', { message: UNEXPECTED_GLOBAL_ERROR });
      }
    },
  });
};
