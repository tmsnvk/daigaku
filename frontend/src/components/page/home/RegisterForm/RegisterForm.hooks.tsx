import { useMutation } from '@tanstack/react-query';
import {
  SubmitHandler,
  UseFormSetError,
} from 'react-hook-form';
import { axiosConfig } from '@configuration';
import {
  RegisterFormErrorT,
  RegisterFormFieldsT,
} from './RegisterForm.types.ts';
import { ConfirmationModalT } from '@pages/Home/Home.types.ts';

type RegisterFormT = {
  setError: UseFormSetError<RegisterFormFieldsT>;
} & ConfirmationModalT;

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
      setError('root.serverError', {
        type: error.response.status,
        message: error.response.data.message ? error.response.data.message : 'An unexpected error has happened. Please try again later.',
      });
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
