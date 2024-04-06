import { useMutation } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';
import {
  MUTATION_KEYS,
  axiosConfig,
} from '@configuration';
import { ConfirmationModalT } from '@pages/shared/Home/Home.types.ts';

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
    mutationKey: [MUTATION_KEYS.ACCOUNT.POST_FORGOTTEN_PASSWORD_FORM],
    mutationFn: async (data: ForgottenPasswordFormFieldsT): Promise<void> => {
      await axiosConfig.request({
        method: 'POST',
        url: '/api/accounts/forgotten-password',
        data,
      });
    },
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
