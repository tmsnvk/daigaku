import { useMutation } from '@tanstack/react-query';
import {
  SubmitHandler,
  UseFormSetError,
} from 'react-hook-form';
import { axiosConfigWithAuth } from '@configuration';
import {
  NewApplicationFormErrorT,
  NewApplicationFormFieldsT,
} from './NewApplicationForm.types.ts';
import { useState } from 'react';

type NewApplicationFormT = {
  setError: UseFormSetError<NewApplicationFormFieldsT>;
};

const useSubmitNewApplicationForm = ({ setError }: NewApplicationFormT) => {
  const { mutate, isPending } = useMutation({
    mutationKey: ['newApplicationForm'],
    mutationFn: async (data: NewApplicationFormFieldsT): Promise<void> => {
      await axiosConfigWithAuth.request({
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

const useCheckFieldDisableStatus = () => {
  const [isCountrySelected, setIsCountrySelected] = useState<boolean>(true);

  const handleCountrySelectionStatus = () => {
    setIsCountrySelected(false);
  };

  return {
    isCountrySelected,
    handleCountrySelectionStatus,
  };
};

export {
  useSubmitNewApplicationForm,
  useCheckFieldDisableStatus,
};
