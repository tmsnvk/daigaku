import { useMutation } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';

import { pendingAccountService } from '@services/index.ts';

import { mutationKeys } from '@configuration';

import { ConfirmationModalT } from '../../Home.types.ts';

export type RegisterFormFieldsT = {
  firstName: string;
  lastName: string;
  email: string;
  institutionUuid: string;
  accountRoleUuid: string;
}

type RegisterFormT = {
  setError: UseFormSetError<RegisterFormFieldsT>;
} & ConfirmationModalT;

type RegisterFormErrorFieldsT =
  `root.${string}` |
  'root' |
  'firstName' |
  'lastName' |
  'email' |
  'institutionUuid' |
  'accountRoleUuid';

type RegisterFormErrorT = {
  response: {
    status: number;
    data: {
      [key: string]: RegisterFormErrorFieldsT;
    }
  }
}

const useSubmitRegistrationForm = ({ setError, showModal }: RegisterFormT) => {
  return useMutation({
    mutationKey: [mutationKeys.ACCOUNT.POST_REGISTER],
    mutationFn: (data: RegisterFormFieldsT) => pendingAccountService.register(data),
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
  useSubmitRegistrationForm,
};
