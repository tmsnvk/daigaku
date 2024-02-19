import {
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import {
  SubmitHandler,
  UseFormSetError,
} from 'react-hook-form';
import { axiosConfigWithAuth } from '@configuration';
import {
  NewApplicationFormErrorT,
  NewApplicationFormFieldsT,
  UniversitiesT,
} from './NewApplicationForm.types.ts';

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

const getUniversities = async () => {
  try {
    const { data }: { data: UniversitiesT[] } = await axiosConfigWithAuth.request({
      method: 'GET',
      url: 'api/universities',
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};

const useGetUniversities = () => {
  const query = useQuery({
    queryKey: ['getUniversities'],
    queryFn: () => getUniversities(),
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
  };
};

export {
  useSubmitNewApplicationForm,
  useGetUniversities,
};
