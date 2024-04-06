import {
  useMutation,
  useQueries,
  useQueryClient,
} from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';
import {
  applicationStatusService,
  finalDestinationStatusService,
  interviewStatusService,
  offerStatusService,
  responseStatusService,
} from '@services/application';
import {
  axiosConfigWithAuth,
  mutationKeys,
  queryKeys,
} from '@configuration';
import { ApplicationT } from '@custom-types/ApplicationT.ts';
import { ApplicationStatusT } from '@services/application/ApplicationStatus.service.ts';
import { InterviewStatusT } from '@services/application/InterviewStatusService.service.ts';
import { OfferStatusT } from '@services/application/OfferStatus.service.ts';
import { ResponseStatusT } from '@services/application/ResponseStatus.service.ts';
import { FinalDestinationStatusT } from '@services/application/FinalDestinationStatus.service.ts';
import { AxiosResponse } from 'axios';

type ApplicationOptionStatusesT = {
  options: {
    applicationStatus: AxiosResponse<ApplicationStatusT[]> | undefined;
    // interviewStatus: AxiosResponse<InterviewStatusT[]> | undefined;
    // offerStatus: AxiosResponse<OfferStatusT[]> | undefined;
    // responseStatus: AxiosResponse<ResponseStatusT[]> | undefined;
    // finalDestinationStatus: AxiosResponse<FinalDestinationStatusT[]> | undefined;
  },
  isLoading: boolean;
  isError: boolean;
}

const useGetAllSelectOptions = (): ApplicationOptionStatusesT => {
  return useQueries({
    queries: [
      { queryKey: [queryKeys.APPLICATION_STATUS.GET_ALL], queryFn: applicationStatusService.getAll },
      // { queryKey: [queryKeys.INTERVIEW_STATUS.GET_ALL], queryFn: interviewStatusService.getAll },
      // { queryKey: [queryKeys.OFFER_STATUS.GET_ALL], queryFn: offerStatusService.getAll },
      // { queryKey: [queryKeys.RESPONSE_STATUS.GET_ALL], queryFn: responseStatusService.getAll },
      // { queryKey: [queryKeys.FINAL_DESTINATION.GET_ALL], queryFn: finalDestinationStatusService.getAll },
    ],
    combine: (responses) => {
      return {
        options: {
          applicationStatus: responses[0].data,
          // interviewStatus: responses[1].options,
          // offerStatus: responses[2].options,
          // responseStatus: responses[3].options,
          // finalDestinationStatus: responses[4].options,
        },
        isLoading: responses.some((response) => response.isLoading),
        isError: responses.some((response) => response.isError),
      };
    },
  });
};

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
    mutationKey: [mutationKeys.APPLICATION.PUT_BY_ID],
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
        [queryKeys.APPLICATION.GET_ALL],
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
  useGetAllSelectOptions,
  useUpdateApplication,
};
