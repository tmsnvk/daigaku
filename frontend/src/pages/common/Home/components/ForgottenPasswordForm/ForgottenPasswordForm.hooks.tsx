import { useMutation } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';
import accountService from '@services/account/account.service.ts';
import { mutationKeys } from '@configuration';
import { ConfirmationModalT } from '../../Home.types.ts';

export type ForgottenPasswordFormFieldsT = {
  email: string;
}

type ForgottenPasswordFormT = {
  setError: UseFormSetError<ForgottenPasswordFormFieldsT>;
} & ConfirmationModalT;

type ForgottenPasswordFormErrorFieldsT = `root.${string}` | 'root' | 'email';

type ForgottenPasswordFormErrorT = {
  response: {
    status: number;
    data: {
      [key: string]: ForgottenPasswordFormErrorFieldsT;
    }
  }
}

const useSubmitForgottenPasswordForm = ({ setError, showModal }: ForgottenPasswordFormT) => {
  return useMutation({
    mutationKey: [mutationKeys.ACCOUNT.POST_FORGOTTEN_PASSWORD],
    mutationFn: (data: ForgottenPasswordFormFieldsT) => accountService.passwordReset(data),
    onSuccess: () => {
      showModal();
    },
    onError: (error: ForgottenPasswordFormErrorT) => {
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
