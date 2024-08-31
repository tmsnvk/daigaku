/**
 * @prettier
 */

/* external imports */
import { useMutation } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';

/* service imports */
import { accountService } from '@services/account/account.service';

/* configuration imports */
import { mutationKeys } from '@configuration';

/* interface, type, enum imports */
import { ConfirmationModal } from '../../home.types';
import { MutationResult } from '@common-types';

/* interfaces, types, enums */
export interface ForgottenPasswordFormFields {
  email: string;
}

type ForgottenPasswordForm = {
  setError: UseFormSetError<ForgottenPasswordFormFields>;
} & ConfirmationModal;

type ForgottenPasswordFormErrorFieldsT = `root.${string}` | 'root' | 'email';

interface ForgottenPasswordFormError {
  response: {
    status: number;
    data: {
      [key: string]: ForgottenPasswordFormErrorFieldsT;
    };
  };
}

export type SubmitForgottenPasswordForm = MutationResult<void, ForgottenPasswordFormError, ForgottenPasswordFormFields>;

/*
 * custom hook - TODO - add functionality description
 */
export const useSubmitForgottenPasswordForm = ({ setError, showModal }: ForgottenPasswordForm): SubmitForgottenPasswordForm => {
  return useMutation({
    mutationKey: [mutationKeys.ACCOUNT.POST_FORGOTTEN_PASSWORD],
    mutationFn: (data: ForgottenPasswordFormFields) => accountService.passwordReset(data),
    onSuccess: () => {
      showModal();
    },
    onError: (error: ForgottenPasswordFormError) => {
      if (error.response.data.email) {
        setError('email', { message: error.response.data.email });
      }

      if (error.response.data.root) {
        setError('root.serverError', { message: error.response.data.root });
      }
    },
  });
};
