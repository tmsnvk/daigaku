import {
  useMutation,
  useQueries,
} from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';
import { AxiosResponse } from 'axios';
import {
  applicationService,
  applicationStatusService,
  finalDestinationStatusService,
  interviewStatusService,
  offerStatusService,
  responseStatusService,
} from '@services/index.ts';
import {
  mutationKeys,
  queryClient,
  queryKeys,
} from '@configuration';
import {
  finalDestinationSelectionError,
  firmChoiceSelectionError,
} from './ApplicationForm.utilities.ts';
import { ApplicationT } from '@services/application/application.service.ts';
import { ApplicationStatusT } from '@services/application/applicationStatus.service.ts';
import { InterviewStatusT } from '@services/application/interviewStatusService.service.ts';
import { OfferStatusT } from '@services/application/offerStatus.service.ts';
import { ResponseStatusT } from '@services/application/responseStatus.service.ts';
import { FinalDestinationStatusT } from '@services/application/finalDestinationStatus.service.ts';

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
      {
        queryKey: [queryKeys.APPLICATION_STATUS.GET_ALL],
        queryFn: applicationStatusService.getAll,
      },
      {
        queryKey: [queryKeys.INTERVIEW_STATUS.GET_ALL],
        queryFn: interviewStatusService.getAll,
      },
      {
        queryKey: [queryKeys.OFFER_STATUS.GET_ALL],
        queryFn: offerStatusService.getAll,
      },
      {
        queryKey: [queryKeys.RESPONSE_STATUS.GET_ALL],
        queryFn: responseStatusService.getAll,
      },
      {
        queryKey: [queryKeys.FINAL_DESTINATION.GET_ALL],
        queryFn: finalDestinationStatusService.getAll,
      },
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
  applicationStatusUuid: string;
  interviewStatusUuid: string;
  offerStatusUuid: string;
  responseStatusUuid: string;
  finalDestinationStatusUuid: string;
}

type FormSubmissionT = {
  formData: UpdateApplicationFormFieldsT;
  mutate: (formData: UpdateApplicationFormFieldsT) => void;
  setError: UseFormSetError<UpdateApplicationFormFieldsT>;
}

type CachedData = {
  name: string;
  uuid: string;
};

const filterCacheByUuid = <T extends CachedData> (cache: AxiosResponse<T[]>, optionName: string): string => {
  const filteredOption = cache?.data.filter((option) => option.name === optionName)[0];

  return filteredOption.uuid;
};

const useHandleFormSubmission = () => {
  const handleValidation = (formData: UpdateApplicationFormFieldsT) => {
    const errors: string[] = [];

    const applicationsCache = queryClient.getQueryData<AxiosResponse<ApplicationT[]>>([queryKeys.APPLICATION.GET_ALL_BY_ROLE]);
    const responseStatusCache = queryClient.getQueryData<AxiosResponse<FinalDestinationStatusT[]>>([queryKeys.RESPONSE_STATUS.GET_ALL]);
    const finalDestinationStatusCache = queryClient.getQueryData<AxiosResponse<FinalDestinationStatusT[]>>([queryKeys.FINAL_DESTINATION.GET_ALL]);

    if (!applicationsCache || !responseStatusCache || !finalDestinationStatusCache) {
      return [];
    }

    const firmChoiceUuid = filterCacheByUuid(responseStatusCache, 'Firm Choice');
    const finalDestinationUuid = filterCacheByUuid(finalDestinationStatusCache, 'Final Destination');
    const finalDestinationDeferredUuid = filterCacheByUuid(finalDestinationStatusCache, 'Final Destination (Deferred Entry)');

    applicationsCache?.data.forEach((application) => {
      if (application.responseStatus === 'Firm Choice' && formData.responseStatusUuid === firmChoiceUuid) {
        errors.push(firmChoiceSelectionError);
      }

      if (application.finalDestinationStatus === 'Final Destination' && formData.finalDestinationStatusUuid === finalDestinationUuid) {
        errors.push(finalDestinationSelectionError);
      }

      if (application.finalDestinationStatus === 'Final Destination (Deferred Entry)' && formData.finalDestinationStatusUuid === finalDestinationDeferredUuid) {
        errors.push(finalDestinationSelectionError);
      }
    });

    return errors;
  };

  const submitForm = ({ formData, mutate, setError }: FormSubmissionT) => {
    const validationError = handleValidation(formData);

    if (!validationError.length) {
      mutate(formData);
    } else {
      setError('root.serverError', { message: validationError.join(' ') });
    }
  };

  return {
    submitForm,
  };
};

type UpdateApplicationFormT = {
  setError: UseFormSetError<UpdateApplicationFormFieldsT>;
  reset: () => void;
  applicationUuid: string;
};

type UpdateApplicationFormErrorFieldsT =
  `root.${string}` |
  'root' |
  'applicationStatusUuid' |
  'interviewStatusUuid' |
  'offerStatusUuid' |
  'responseStatusUuid' |
  'finalDestinationStatusUuid';

type UpdateApplicationFormErrorT = {
  response: {
    status: number;
    data: {
      [key: string]: UpdateApplicationFormErrorFieldsT;
    }
  }
};

const useUpdateApplication = ({ setError, reset, applicationUuid }: UpdateApplicationFormT) => {
  return useMutation({
    mutationKey: [mutationKeys.APPLICATION.PATCH_BY_UUID],
    mutationFn: (data: UpdateApplicationFormFieldsT) => applicationService.patchByUuid(data, applicationUuid),
    onSuccess: ({ data }: AxiosResponse<ApplicationT>) => {
      queryClient.setQueryData<AxiosResponse<ApplicationT[]>>(
        [queryKeys.APPLICATION.GET_ALL_BY_ROLE],
        (previousData) => {
          if (!previousData) {
            return;
          }

          const filteredList = previousData.data.filter((row) => row.uuid !== data.uuid);

          return { ...previousData, data: [...filteredList, data] };
        },
      );

      history.replaceState(data, '', `/applications/${data.uuid}`);
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
  useHandleFormSubmission,
  useUpdateApplication,
};
