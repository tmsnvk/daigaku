import { useMutation } from '@tanstack/react-query';
import {
  SubmitHandler,
  UseFormSetError,
} from 'react-hook-form';
import { axiosConfig } from '@configuration';
import {
  RegisterFormErrorT,
  RegisterFormFieldsT,
  RegisterFormReturnDataT,
} from './RegisterForm.types.ts';

const useSubmitRegisterForm = (setError: UseFormSetError<RegisterFormFieldsT>) => {
  const { mutate, reset } = useMutation({
    mutationKey: ['userRegisterForm'],
    mutationFn: async (data: RegisterFormFieldsT): Promise<RegisterFormReturnDataT> => {
      const response = await axiosConfig.request({
        method: 'POST',
        url: '/api/users/register',
        data,
      });

      return response.data;
    },
    onSuccess: (data: RegisterFormReturnDataT) => {
      // TODO - create a confirmation modal window
      reset();
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
    onSubmit,
  };
};

export {
  useSubmitRegisterForm,
};
