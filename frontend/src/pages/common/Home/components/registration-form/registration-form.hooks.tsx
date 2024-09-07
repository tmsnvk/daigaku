/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
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
import { MutationResult, ServerValidationErrorResponse } from '@common-types';
import { UNEXPECTED_GLOBAL_ERROR, UNEXPECTED_SERVER_ERROR } from '@constants';
import { ConfirmationModal } from '../../home.types';

/**
 * ===============
 * Custom Hook {@link useSubmitRegistrationForm}
 * ===============
 */

/* interfaces, types, enums */
export interface RegistrationFormFields {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly institutionUuid: string;
  readonly accountRoleUuid: string;
}

type RegistrationForm = {
  setError: UseFormSetError<RegistrationFormFields>;
} & ConfirmationModal;

type RegistrationFormErrorT = 'root' | 'firstName' | 'lastName' | 'email' | 'institutionUuid' | 'accountRoleUuid';

export type SubmitRegistrationForm = MutationResult<void, AxiosError<Array<ServerValidationErrorResponse>>, RegistrationFormFields>;

/**
 * @description
 * The custom hook manages the {@link RegistrationForm} submission process, including REST API request, error handling, and post-success actions.
 *
 * @param {UseFormSetError<RegistrationFormFields>} params.setError - A `react-hook-form` function to set form errors.
 * @param {Function} params.showModal - A function to show the {@link ConfirmationModal}, used in the component.
 *
 * @returns {HandleLoginForm} - The `react-query` mutation object.
 *
 * @since 0.0.1
 */
export const useSubmitRegistrationForm = ({ setError, showModal }: RegistrationForm): SubmitRegistrationForm => {
  return useMutation({
    mutationKey: [mutationKeys.account.POST_REGISTER],
    mutationFn: (formData: RegistrationFormFields) => pendingAccountService.register(formData),
    onSuccess: () => {
      showModal();
    },
    onError: (error: AxiosError<Array<ServerValidationErrorResponse>>) => {
      if (axios.isAxiosError(error)) {
        const status: number | undefined = error.response?.status;
        const errors: Array<ServerValidationErrorResponse> | undefined = error.response?.data;

        if (status) {
          if (status === 400 && errors) {
            errors.forEach((error: ServerValidationErrorResponse) => {
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
