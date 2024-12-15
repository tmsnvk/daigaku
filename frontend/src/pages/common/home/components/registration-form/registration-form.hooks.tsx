/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* external imports */
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { UseFormSetError } from 'react-hook-form';

/* logic imports */
import { pendingAccountService } from '@services/index';

/* configuration, utilities, constants imports */
import { mutationKeys } from '@configuration';

/* interface, type, enum imports */
import { DefaultErrorResponse, ErrorDetail, MutationResult } from '@common-types';
import { UNEXPECTED_GLOBAL_ERROR, UNEXPECTED_SERVER_ERROR } from '@constants';
import { ConfirmationModal } from '../../home.interfaces';

/**
 * ===============
 * Custom Hook {@link useSubmitRegistrationForm}
 * ===============
 */

/**
 * Defines the properties of a single user registration form submission.
 *
 * @since 0.0.1
 */
export interface RegistrationFormFields {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly institutionUuid: string;
  readonly accountRoleUuid: string;
}

/**
 * Defines the {@link useSubmitRegistrationForm} custom hook's error types.
 *
 * @since 0.0.1
 */
type RegistrationFormErrorT = 'root' | 'firstName' | 'lastName' | 'email' | 'institutionUuid' | 'accountRoleUuid';

/**
 * Defines the {@link useSubmitRegistrationForm} custom hook's return value properties.
 *
 * @since 0.0.1
 */
export type HandleRegistrationForm = MutationResult<void, AxiosError<DefaultErrorResponse>, RegistrationFormFields>;

/**
 * Manages the {@link RegistrationForm} submission process, including REST API request, error handling, and post-success actions.
 *
 * @param setError A `react-hook-form` function to set form errors.
 * @param showModal A function to show the {@link ConfirmationModal}, used in the component.
 * @return {HandleRegistrationForm}
 *
 * @since 0.0.1
 */
export const useSubmitRegistrationForm = (
  setError: UseFormSetError<RegistrationFormFields>,
  showModal: ConfirmationModal['showModal'],
): HandleRegistrationForm => {
  return useMutation({
    mutationKey: [mutationKeys.account.POST_REGISTER],
    mutationFn: (formData: RegistrationFormFields) => pendingAccountService.register(formData),
    onSuccess: () => {
      showModal();
    },
    onError: (error: AxiosError<DefaultErrorResponse>) => {
      if (axios.isAxiosError(error)) {
        const status: number | undefined = error.response?.status;
        const errors: DefaultErrorResponse | undefined = error.response?.data;

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
