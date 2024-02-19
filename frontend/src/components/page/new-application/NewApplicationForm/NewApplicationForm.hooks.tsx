import {
  SubmitHandler,
  UseFormSetError,
} from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { axiosConfig } from '@configuration';
import {
  NewApplicationFormErrorT,
  NewApplicationFormFieldsT,
} from './NewApplicationForm.types.ts';

type NewApplicationFormT = {
  setError: UseFormSetError<NewApplicationFormFieldsT>;
};

const useSubmitNewApplicationForm = ({ setError }: NewApplicationFormT) => {
  const { mutate, isPending } = useMutation({
    mutationKey: ['newApplicationForm'],
    mutationFn: async (data: NewApplicationFormFieldsT): Promise<void> => {
      await axiosConfig.request({
        method: 'POST',
        url: '/api/',
        data,
      });
    },
    onSuccess: () => {
    },
    onError: (error: NewApplicationFormErrorT) => {
      setError('root.serverError', {
        type: error.response.status,
        message: error.response.data.message ? error.response.data.message : 'An unexpected error has happened. Please try again later.',
      });
    },
  });

  const onSubmit: SubmitHandler<NewApplicationFormFieldsT> = (formData: NewApplicationFormFieldsT) => {
    mutate(formData);
  };

  return {
    isPending,
    onSubmit,
  };
};

export {
  useSubmitNewApplicationForm,
};
