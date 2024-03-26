import { useState } from 'react';
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {
  SubmitHandler,
  UseFormSetError,
} from 'react-hook-form';
import {
  axiosConfigWithAuth,
  queryKeys,
} from '@configuration';
import { ApplicationT } from '@hooks/applications/useGetApplicationsByStudent.tsx';

export type NewApplicationFormFieldsT = {
  country: string;
  university: string;
  courseName: string;
  minorSubject: string;
  programmeLength: number;
}

type NewApplicationFormT = {
  setError: UseFormSetError<NewApplicationFormFieldsT>;
};

type NewApplicationFormErrorFieldsT = `root.${string}` |
  'root' |
  'country' |
  'university' |
  'courseName' |
  'minorSubject' |
  'programmeLength';

type NewApplicationFormErrorT = {
  response: {
    status: number;
    data: {
      [key: string]: NewApplicationFormErrorFieldsT;
    }
  }
}

const useSubmitNewApplicationForm = ({ setError }: NewApplicationFormT) => {
  const queryClient = useQueryClient();

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
      queryClient.setQueryData(
        [queryKeys.getApplicationsByStudent],
        (previousData: ApplicationT[] | undefined) => previousData ? [data, ...previousData] : [data],
      );
    },
    onError: (error: NewApplicationFormErrorT) => {
      for (const fieldId in error.response.data) {
        if (error.response.data[fieldId]) {
          setError(fieldId as NewApplicationFormErrorFieldsT, { message: error.response.data[fieldId] });
        }
      }

      if (error.response.data.root) {
        setError('root.serverError', { message: error.response.data.root });
      }
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
