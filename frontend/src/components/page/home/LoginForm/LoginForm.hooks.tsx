import { useMutation } from '@tanstack/react-query';
import {
  SubmitHandler,
  UseFormSetError,
} from 'react-hook-form';
import { axiosConfig } from '@configuration';
import {
  LoginFormErrorT,
  LoginFormFieldsT,
  LoginFormUserDataT,
} from './LoginForm.types.ts';

const useSubmitForm = (setError: UseFormSetError<LoginFormFieldsT>) => {
  const { mutate, reset } = useMutation({
    mutationKey: ['userLoginForm'],
    mutationFn: async (data: LoginFormFieldsT): Promise<LoginFormUserDataT> => {
      const response = await axiosConfig.request({
        method: 'POST',
        url: '/api/users/login',
        data,
      });

      return response.data;
    },
    onSuccess: (data: LoginFormUserDataT) => {
      // TODO - set data to context
      reset();
    },
    onError: (error: LoginFormErrorT) => {
      console.log(error);
      setError('root.serverError', {
        type: error.response.status,
        message: error.response.data.message ? error.response.data.message : 'An unexpected error has happened. Please try again later.',
      });
    },
  });

  const onSubmit: SubmitHandler<LoginFormFieldsT> = (formData: LoginFormFieldsT) => {
    mutate(formData);
  };

  return {
    onSubmit,
  };
};

export {
  useSubmitForm,
};
