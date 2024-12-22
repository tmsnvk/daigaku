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
import { accountService } from '@services/account/account.service';

/* configuration, utilities, constants imports */
import { mutationKeys } from '@configuration';
import { UNEXPECTED_GLOBAL_ERROR, UNEXPECTED_SERVER_ERROR } from '@constants';

/* interface, type, enum imports */
import { CoreErrorResponse, MutationResult } from '@common-types';
import { ConfirmationModal } from '../../home.interfaces';

/**
 * ===============
 * Custom Hook {@link useHandleResetForm}
 * ===============
 */

/**
 * Defines the properties of a single user registration form submission.
 *
 * @since 0.0.1
 */
export interface ResetFormFields {
  email: string;
}

/**
 * Defines the {@link useSubmitRegistrationForm} custom hook's error types.
 *
 * @since 0.0.1
 */
type ResetFormErrorT = 'root';

/**
 * Defines the {@link useSubmitRegistrationForm} custom hook's return value properties.
 *
 * @since 0.0.1
 */
export type HandleResetForm = MutationResult<void, AxiosError<CoreErrorResponse>, ResetFormFields>;

/**
 * Manages the {@link ResetForm} submission process, including REST API request, error handling, and post-success actions.
 *
 * @param setError A `react-hook-form` function to set form errors.
 * @param showModal A function to show the {@link ConfirmationModal}, used in the component.
 * @return {HandleResetForm}
 *
 * @since 0.0.1
 */
export const useHandleResetForm = (
  setError: UseFormSetError<ResetFormFields>,
  showModal: ConfirmationModal['showModal'],
): HandleResetForm => {
  return useMutation({
    mutationKey: [mutationKeys.account.POST_RESET_FORM],
    mutationFn: (formData: ResetFormFields) => accountService.resetPassword(formData),
    onSuccess: () => {
      showModal();
    },
    onError: (error: AxiosError<CoreErrorResponse>) => {
      if (axios.isAxiosError(error)) {
        const status: number | undefined = error.response?.data.errorCode;

        if (status) {
          if (status >= 500) {
            setError('root', { message: UNEXPECTED_SERVER_ERROR });
          }
        }
      } else {
        setError('root', { message: UNEXPECTED_GLOBAL_ERROR });
      }
    },
  });
};
