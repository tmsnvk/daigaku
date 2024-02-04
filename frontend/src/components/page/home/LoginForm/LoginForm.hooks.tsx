import { useMutation } from '@tanstack/react-query';
import {
  SubmitHandler,
  UseFormSetError,
} from 'react-hook-form';
import { axiosConfig } from '@configuration';
import {
  LoginFormErrorT,
  LoginFormFieldsT,
  LoginFormReturnDataT,
} from './LoginForm.types.ts';

type LoginFormT = {
  setError: UseFormSetError<LoginFormFieldsT>;
}

const useSubmitLoginForm = ({ setError }: LoginFormT) => {
  const { mutate, isPending, reset } = useMutation({
    mutationKey: ['userLoginForm'],
    mutationFn: async (data: LoginFormFieldsT): Promise<LoginFormReturnDataT> => {
      console.log(data)
      const response = await axiosConfig.request({
        method: 'POST',
        url: '/api/users/login',
        data,
      });

      return response.data;
    },
    onSuccess: (data: LoginFormReturnDataT) => {
      // TODO - set data to context
      reset();
    },
    onError: (error: LoginFormErrorT) => {
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
    isPending,
    onSubmit,
  };
};

export {
  useSubmitLoginForm,
};
