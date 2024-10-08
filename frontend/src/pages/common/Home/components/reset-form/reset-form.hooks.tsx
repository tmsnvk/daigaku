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
import { accountService } from '@services/account/account.service';

/* configuration, utilities, constants imports */
import { mutationKeys } from '@configuration';
import { UNEXPECTED_GLOBAL_ERROR, UNEXPECTED_SERVER_ERROR } from '@constants';

/* interface, type, enum imports */
import { MutationResult } from '@common-types';
import { ConfirmationModal } from '../../home.interfaces';

/**
 * ===============
 * Custom Hook {@link useHandleResetForm}
 * ===============
 */

/* interfaces, types, enums */
export interface ResetFormFields {
  email: string;
}

type HandleResetFormParams = {
  setError: UseFormSetError<ResetFormFields>;
} & ConfirmationModal;

type ResetFormErrorT = 'root';

export type HandleResetForm = MutationResult<void, AxiosError<ResetFormErrorT>, ResetFormFields>;

/**
 * @description
 * The custom hook manages the {@link ResetForm} submission process, including REST API request, error handling, and post-success actions.
 *
 * @param {UseFormSetError<ResetFormFields>} params.setError
 * A `react-hook-form` function to set form errors.
 * @param {Function} params.showModal
 * A function to show the {@link ConfirmationModal}, used in the component.
 *
 * @returns {HandleResetForm}
 * A `react-query` mutation object.
 *
 * @since 0.0.1
 */
export const useHandleResetForm = ({ setError, showModal }: HandleResetFormParams): HandleResetForm => {
  return useMutation({
    mutationKey: [mutationKeys.account.POST_RESET_FORM],
    mutationFn: (formData: ResetFormFields) => accountService.resetPassword(formData),
    onSuccess: () => {
      showModal();
    },
    onError: (error: AxiosError<ResetFormErrorT>) => {
      if (axios.isAxiosError(error)) {
        const status: number | undefined = error.response?.status;

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
