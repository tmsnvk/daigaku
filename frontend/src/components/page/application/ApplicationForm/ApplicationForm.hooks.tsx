import {
  useMutation,
  useQueries,
  useQueryClient,
} from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';
import { AxiosResponse } from 'axios';
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

type ApplicationOptionStatusesT = {
  options: {
    applicationStatus: AxiosResponse<ApplicationStatusT[]> | undefined;
    interviewStatus: AxiosResponse<InterviewStatusT[]> | undefined;
    offerStatus: AxiosResponse<OfferStatusT[]> | undefined;
    responseStatus: AxiosResponse<ResponseStatusT[]> | undefined;
    finalDestinationStatus: AxiosResponse<FinalDestinationStatusT[]> | undefined;
  },
  isLoading: boolean;
  isError: boolean;
}

const useGetAllSelectOptions = (): ApplicationOptionStatusesT => {
  return useQueries({
    queries: [
      { queryKey: [queryKeys.APPLICATION_STATUS.GET_ALL], queryFn: applicationStatusService.getAll },
      { queryKey: [queryKeys.INTERVIEW_STATUS.GET_ALL], queryFn: interviewStatusService.getAll },
      { queryKey: [queryKeys.OFFER_STATUS.GET_ALL], queryFn: offerStatusService.getAll },
      { queryKey: [queryKeys.RESPONSE_STATUS.GET_ALL], queryFn: responseStatusService.getAll },
      { queryKey: [queryKeys.FINAL_DESTINATION.GET_ALL], queryFn: finalDestinationStatusService.getAll },
    ],
    combine: (result) => {
      return {
        options: {
          applicationStatus: result[0].data,
          interviewStatus: result[1].data,
          offerStatus: result[2].data,
          responseStatus: result[3].data,
          finalDestinationStatus: result[4].data,
        },
        isLoading: result.some((option) => option.isLoading),
        isError: result.some((option) => option.isError),
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
    mutationKey: [mutationKeys.APPLICATION.PATCH_BY_UUID],
    mutationFn: async (data: UpdateApplicationFormFieldsT): Promise<ApplicationT> => {
      // update this appropriate for mentor/admin links
      const response = await axiosConfigWithAuth.request({
        method: 'PATCH',
        url: `/api/applications/students/${applicationId}`,
        data,
      });

      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        [queryKeys.APPLICATION.GET_ALL],
        (previousData: ApplicationT[]) => {
          const findOldElementOfUpdatedRow = previousData.filter((row) => row.uuid === data.uuid)[0];
          const indexToUpdate = previousData.indexOf(findOldElementOfUpdatedRow);

          previousData.splice(indexToUpdate, 1, data);
        },
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
