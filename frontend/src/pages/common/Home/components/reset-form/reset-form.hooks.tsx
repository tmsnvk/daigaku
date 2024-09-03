/**
 * @prettier
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
import { ConfirmationModal } from '../../home.types';

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
 * A custom hook that manages the {@link ResetForm} submission process, including api request, error handling, and post-success actions.
 *
 * @param {UseFormSetError<ResetFormFields>} params.setError - A react-hook-form function to set form errors.
 *
 * @returns {HandleResetForm} - The mutation object to handle the login process.
 *
 * @since 0.0.1
 */
export const useHandleResetForm = ({ setError, showModal }: HandleResetFormParams): HandleResetForm => {
  return useMutation({
    mutationKey: [mutationKeys.account.POST_RESET_FORM],
    mutationFn: (data: ResetFormFields) => accountService.resetPassword(data),
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
