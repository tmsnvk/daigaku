import { useMutation } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';
import { accountService } from '@services/account';
import { mutationKeys } from '@configuration';
import { ConfirmationModalT } from '@pages/shared/Home/Home.types.ts';

export type RegisterFormFieldsT = {
  firstName: string;
  lastName: string;
  email: string;
}

type RegisterFormT = {
  setError: UseFormSetError<RegisterFormFieldsT>;
} & ConfirmationModalT;

type RegisterFormErrorFieldsT = `root.${string}` | 'root' | 'firstName' | 'lastName' | 'email';

type RegisterFormErrorT = {
  response: {
    status: number;
    data: {
      [key: string]: RegisterFormErrorFieldsT;
    }
  }
}

const useSubmitRegisterForm = ({ setError, showModal }: RegisterFormT) => {
  return useMutation({
    mutationKey: [mutationKeys.ACCOUNT.POST_REGISTER_FORM],
    mutationFn: accountService.register,
    onSuccess: () => {
      showModal();
    },
    onError: (error: RegisterFormErrorT) => {
      for (const fieldId in error.response.data) {
        if (error.response.data[fieldId]) {
          setError(fieldId as RegisterFormErrorFieldsT, { message: error.response.data[fieldId] });
        }
      }

      if (error.response.data.root) {
        setError('root.serverError', { message: error.response.data.root });
      }
    },
  });
};

export {
  useSubmitRegisterForm,
};
