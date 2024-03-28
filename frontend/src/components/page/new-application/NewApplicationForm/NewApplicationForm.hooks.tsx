import { useState } from 'react';
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';
import {
  axiosConfigWithAuth,
  mutationKeys,
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
  resetCountryField: () => void;
  reset: () => void;
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

const useSubmitNewApplicationForm = ({ setError, resetCountryField, reset }: NewApplicationFormT) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [mutationKeys.postApplicationByStudent],
    mutationFn: async (data: NewApplicationFormFieldsT): Promise<ApplicationT> => {
      const response = await axiosConfigWithAuth.request({
        method: 'POST',
        url: '/api/applications/students',
        data,
      });

      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        [queryKeys.getApplicationsByStudent],
        (previousData: ApplicationT[] | undefined) => previousData ? [data, ...previousData] : [data],
      );

      resetCountryField();
      reset();
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
};

const useCheckFieldDisableStatus = () => {
  const [isCountryNotSelected, setIsCountryNotSelected] = useState<boolean>(true);

  const handleCountrySelectionStatus = () => {
    setIsCountryNotSelected(false);
  };

  const resetCountryField = () => {
    setIsCountryNotSelected(true);
  };

  return {
    isCountryNotSelected,
    resetCountryField,
    handleCountrySelectionStatus,
  };
};

export {
  useSubmitNewApplicationForm,
  useCheckFieldDisableStatus,
};
