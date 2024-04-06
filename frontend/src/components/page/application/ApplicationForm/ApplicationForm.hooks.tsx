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
import { ApplicationT } from '@custom-types/ApplicationT.ts';

export type UpdateApplicationFormFieldsT = {
  applicationStatus: string;
  interviewStatus: string;
  offerStatus: string;
  responseStatus: string;
  finalDestinationStatus: string;
}

type UpdateApplicationFormT = {
  setError: UseFormSetError<UpdateApplicationFormFieldsT>;
  reset: () => void;
  applicationId: string;
};

type UpdateApplicationFormErrorFieldsT = `root.${string}` |
  'root' |
  'applicationStatus' |
  'interviewStatus' |
  'offerStatus' |
  'responseStatus' |
  'finalDestinationStatus';

type UpdateApplicationFormErrorT = {
  response: {
    status: number;
    data: {
      [key: string]: UpdateApplicationFormErrorFieldsT;
    }
  }
}

const useUpdateApplication = ({ setError, reset, applicationId }: UpdateApplicationFormT) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [mutationKeys.updateApplication],
    mutationFn: async (data: UpdateApplicationFormFieldsT): Promise<ApplicationT> => {
      const response = await axiosConfigWithAuth.request({
        method: 'PUT',
        url: `/api/applications/${applicationId}`,
        data,
      });

      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        [queryKeys.getApplications],
        (previousData: ApplicationT[] | undefined) => previousData ? [data, ...previousData] : [data],
      );

      reset();
    },
    onError: (error: UpdateApplicationFormErrorT) => {
      for (const fieldId in error.response.data) {
        if (error.response.data[fieldId]) {
          setError(fieldId as UpdateApplicationFormErrorFieldsT, { message: error.response.data[fieldId] });
        }
      }

      if (error.response.data.root) {
        setError('root.serverError', { message: error.response.data.root });
      }
    },
  });
};

export {
  useUpdateApplication,
};
