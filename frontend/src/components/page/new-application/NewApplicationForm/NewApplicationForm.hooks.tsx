import { useState } from 'react';
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
import { ApplicationT } from '@hooks/useGetApplications.tsx';

type NewApplicationFormT = {
  setError: UseFormSetError<NewApplicationFormFieldsT>;
};

const useSubmitNewApplicationForm = ({ setError }: NewApplicationFormT) => {
  const { isPending, isSuccess, mutate } = useMutation({
    mutationKey: ['newApplicationForm'],
    mutationFn: async (data: NewApplicationFormFieldsT): Promise<ApplicationT> => {
      const response = await axiosConfigWithAuth.request({
        method: 'POST',
        url: '/api/applications',
        data,
      });

      return response.data;
    },
    onSuccess: (data) => {
      const applications: ApplicationT[] = JSON.parse(localStorage.getItem('applications') || '[]');

      applications.push(data);
      localStorage.setItem('applications', JSON.stringify(applications));
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
    isSuccess,
    onSubmit,
  };
};

const useCheckFieldDisableStatus = () => {
  const [isCountryNotSelected, setIsCountryNotSelected] = useState<boolean>(true);

  const handleCountrySelectionStatus = () => {
    setIsCountryNotSelected(false);
  };

  return {
    isCountryNotSelected,
    setIsCountryNotSelected,
    handleCountrySelectionStatus,
  };
};

export {
  useSubmitNewApplicationForm,
  useCheckFieldDisableStatus,
};
