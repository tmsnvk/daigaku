import { useState } from 'react';
import {
  useMutation,
  useQueries,
} from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';
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
  applicationStatus: ApplicationStatusT[] | undefined;
  interviewStatus: InterviewStatusT[] | undefined;
  offerStatus: OfferStatusT[] | undefined;
  responseStatus: ResponseStatusT[] | undefined;
  finalDestinationStatus: FinalDestinationStatusT[] | undefined;
}

type ApplicationOptionsDataT = {
  options: ApplicationOptionStatusesT;
  isLoading: boolean;
  isError: boolean;
}

const useGetAllSelectOptions = (): ApplicationOptionsDataT => {
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
  applicationUuid: string;
  mutate: (formData: UpdateApplicationFormFieldsT) => void;
  setError: UseFormSetError<UpdateApplicationFormFieldsT>;
}

type CachedData = {
  name: string;
  uuid: string;
};

const filterCacheByUuid = <T extends CachedData> (cache: T[], optionName: string): string => {
  const filteredOption = cache?.filter((option) => option.name === optionName)[0];

  return filteredOption.uuid;
};

const useHandleFormSubmission = () => {
  const handleValidation = (formData: UpdateApplicationFormFieldsT, applicationUuid: string) => {
    const errors: string[] = [];

    const applicationsCache = queryClient.getQueryData<ApplicationT[]>([queryKeys.APPLICATION.GET_ALL_BY_ROLE]);
    const responseStatusCache = queryClient.getQueryData<ResponseStatusT[]>([queryKeys.RESPONSE_STATUS.GET_ALL]);
    const finalDestinationStatusCache = queryClient.getQueryData<FinalDestinationStatusT[]>([queryKeys.FINAL_DESTINATION.GET_ALL]);

    if (!applicationsCache || !responseStatusCache || !finalDestinationStatusCache) {
      return [];
    }

    const firmChoiceUuid = filterCacheByUuid(responseStatusCache, 'Firm Choice');
    const finalDestinationUuid = filterCacheByUuid(finalDestinationStatusCache, 'Final Destination');
    const finalDestinationDeferredUuid = filterCacheByUuid(finalDestinationStatusCache, 'Final Destination (Deferred Entry)');

    applicationsCache.forEach((application) => {
      if (application.uuid !== applicationUuid) {
        if (application.responseStatus === 'Firm Choice' && formData.responseStatusUuid === firmChoiceUuid) {
          errors.push(firmChoiceSelectionError);
        }

        if (application.finalDestinationStatus === 'Final Destination' && formData.finalDestinationStatusUuid === finalDestinationUuid) {
          errors.push(finalDestinationSelectionError);
        }

        if (application.finalDestinationStatus === 'Final Destination (Deferred Entry)' && formData.finalDestinationStatusUuid === finalDestinationDeferredUuid) {
          errors.push(finalDestinationSelectionError);
        }
      }
    });

    return errors;
  };

  const submitForm = ({ formData, applicationUuid, mutate, setError }: FormSubmissionT) => {
    const validationError = handleValidation(formData, applicationUuid);

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
    onSuccess: (data: ApplicationT) => {
      queryClient.setQueryData<ApplicationT[]>(
        [queryKeys.APPLICATION.GET_ALL_BY_ROLE],
        (previousData) => {
          if (!previousData) {
            return;
          }

          const filteredList = previousData.filter((row) => row.uuid !== data.uuid);

          return [...filteredList, data];
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

type DisabledInputFieldsT = {
  currentApplicationData: ApplicationT;
  updatedData: ApplicationT | undefined;
  options: ApplicationOptionStatusesT;
}

const useHandleFieldDisableStatuses = ({ currentApplicationData, updatedData, options }: DisabledInputFieldsT) => {
  const [fieldDisabledStatuses, setFieldDisabledStatuses] = useState<{[key: string]: boolean}>({
    interviewStatus: !(updatedData?.interviewStatus ?? currentApplicationData.interviewStatus),
    offerStatus: !(updatedData?.offerStatus ?? currentApplicationData.offerStatus),
    responseStatus: !(updatedData?.responseStatus ?? currentApplicationData.responseStatus),
    finalDestinationStatus: !(updatedData?.finalDestinationStatus ?? currentApplicationData.finalDestinationStatus),
  });

  const updateInterviewStatus = (eventTargetValue: string) => {
    const planned = options.applicationStatus?.filter((element) => element.name === 'Submitted') as ApplicationStatusT[];

    if (eventTargetValue === planned[0].uuid) {
      setFieldDisabledStatuses({
        ...fieldDisabledStatuses,
        interviewStatus: false,
      });
    } else {
      setFieldDisabledStatuses({
        ...fieldDisabledStatuses,
        interviewStatus: true,
      });
    }
  };

  const updateOfferStatus = (eventTargetValue: string) => {
    const invited = options.interviewStatus?.filter((element) => element.name !== 'Not Invited') as OfferStatusT[];

    if (invited.some((element) => element.uuid === eventTargetValue)) {
      setFieldDisabledStatuses({
        ...fieldDisabledStatuses,
        offerStatus: false,
      });
    } else {
      setFieldDisabledStatuses({
        ...fieldDisabledStatuses,
        offerStatus: true,
      });
    }
  };

  const updateResponseStatus = (eventTargetValue: string) => {
    const positiveResponse = options.offerStatus?.filter((element) => element.name !== 'Rejected') as ResponseStatusT[];

    if (positiveResponse.some((element) => element.uuid === eventTargetValue)) {
      setFieldDisabledStatuses({
        ...fieldDisabledStatuses,
        responseStatus: false,
      });
    } else {
      setFieldDisabledStatuses({
        ...fieldDisabledStatuses,
        responseStatus: true,
      });
    }
  };

  const updateFinalDestinationStatus = (eventTargetValue: string) => {
    const positiveResponse = options.responseStatus?.filter((element) => element.name !== 'Offer Declined') as ResponseStatusT[];

    if (positiveResponse.some((element) => element.uuid === eventTargetValue)) {
      setFieldDisabledStatuses({
        ...fieldDisabledStatuses,
        finalDestinationStatus: false,
      });
    } else {
      setFieldDisabledStatuses({
        ...fieldDisabledStatuses,
        finalDestinationStatus: true,
      });
    }
  };

  const disableFields = () => {

  };

  return {
    fieldDisabledStatuses,
    updateInterviewStatus,
    updateOfferStatus,
    updateResponseStatus,
    updateFinalDestinationStatus,
    disableFields,
  };
};

export {
  useGetAllSelectOptions,
  useHandleFormSubmission,
  useUpdateApplication,
  useHandleFieldDisableStatuses,
};
