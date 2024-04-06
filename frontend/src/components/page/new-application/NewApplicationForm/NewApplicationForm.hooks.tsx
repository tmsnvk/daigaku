import { useState } from 'react';
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';
import {
  MUTATION_KEYS,
  QUERY_KEYS,
  axiosConfigWithAuth,
} from '@configuration';
import { ApplicationT } from '@custom-types/ApplicationT.ts';

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
    mutationKey: [MUTATION_KEYS.APPLICATION.POST_APPLICATION_BY_STUDENT],
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
        [QUERY_KEYS.APPLICATION.GET_APPLICATIONS],
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
