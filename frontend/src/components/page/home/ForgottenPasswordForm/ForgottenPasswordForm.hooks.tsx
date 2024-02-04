import { useMutation } from '@tanstack/react-query';
import {
  SubmitHandler,
  UseFormSetError,
} from 'react-hook-form';
import { axiosConfig } from '@configuration';
import {
  ForgottenPasswordFormErrorT,
  ForgottenPasswordFormFieldsT,
  ForgottenPasswordFormReturnDataT,
} from './ForgottenPasswordForm.types.ts';

type ForgottenPasswordFormT = {
  setError: UseFormSetError<ForgottenPasswordFormFieldsT>;
  showModal: () => void;
}

const useSubmitForgottenPasswordForm = ({ setError, showModal }: ForgottenPasswordFormT) => {
  const { mutate, isPending } = useMutation({
    mutationKey: ['userForgottenPasswordForm'],
    mutationFn: async (data: ForgottenPasswordFormFieldsT): Promise<ForgottenPasswordFormReturnDataT> => {
      const response = await axiosConfig.request({
        method: 'POST',
        url: '/api/users/forgottenpassword',
        data,
      });

      return response.data;
    },
    onSuccess: (data: ForgottenPasswordFormReturnDataT) => {
      showModal();
    },
    onError: (error: ForgottenPasswordFormErrorT) => {
      setError('root.serverError', {
        type: error.response.status,
        message: error.response.data.message ? error.response.data.message : 'An unexpected error has happened. Please try again later.',
      });
    },
  });

  const onSubmit: SubmitHandler<ForgottenPasswordFormFieldsT> = (formData: ForgottenPasswordFormFieldsT) => {
    mutate(formData);
  };

  return {
    isPending,
    onSubmit,
  };
};

export {
  useSubmitForgottenPasswordForm,
};
