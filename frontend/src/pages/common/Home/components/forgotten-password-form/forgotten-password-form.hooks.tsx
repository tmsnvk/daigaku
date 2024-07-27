import { useMutation } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';

import accountService from '@services/account/account.service';

import { mutationKeys } from '@configuration';

import { ConfirmationModal } from '../../home.types';

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
    }
  }
}

const useSubmitForgottenPasswordForm = ({ setError, showModal }: ForgottenPasswordForm) => {
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

export {
  useSubmitForgottenPasswordForm,
};
