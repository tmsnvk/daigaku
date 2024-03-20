import { useMutation } from '@tanstack/react-query';
import {
  SubmitHandler,
  UseFormSetError,
} from 'react-hook-form';
import { axiosConfig } from '@configuration';
import { ConfirmationModalT } from '@pages/Home/Home.types.ts';
import { HttpStatusCodesE } from '@custom-types/HttpStatusCodes.types.ts';

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
  const { mutate, isPending } = useMutation({
    mutationKey: ['userRegistrationForm'],
    mutationFn: async (data: RegisterFormFieldsT): Promise<void> => {
      await axiosConfig.request({
        method: 'POST',
        url: '/api/users/register',
        data,
      });
    },
    onSuccess: () => {
      showModal();
    },
    onError: (error: RegisterFormErrorT) => {
      for (const fieldId in error.response.data) {
        if (error.response.data[fieldId]) {
          setError(fieldId as RegisterFormErrorFieldsT, { message: error.response.data[fieldId] });
        }
      }

      if (error.response.status >= HttpStatusCodesE.INTERNAL_SERVER_ERROR) {
        setError('root.serverError', { message: 'An unexpected error has happened.' });
      }
    },
  });

  const onSubmit: SubmitHandler<RegisterFormFieldsT> = (formData: RegisterFormFieldsT) => {
    mutate(formData);
  };

  return {
    isPending,
    onSubmit,
  };
};

export {
  useSubmitRegisterForm,
};
