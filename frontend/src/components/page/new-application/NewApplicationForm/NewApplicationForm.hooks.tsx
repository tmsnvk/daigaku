import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
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

      navigate('/dashboard');
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
