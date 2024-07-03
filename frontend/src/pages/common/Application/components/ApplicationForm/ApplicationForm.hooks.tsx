import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';
import { applicationService } from '@services/index.ts';
import {
  mutationKeys,
  queryClient,
  queryKeys,
} from '@configuration';
import {
  finalDestinationSelectionError,
  firmChoiceSelectionError,
} from './ApplicationForm.utilities.ts';
import {
  ApplicationStatusE,
  FinalDestinationE,
  InterviewStatusE,
  OfferStatusE,
  ResponseStatusE,
} from '@constants/applicationStatusEnums.ts';
import { ApplicationT } from '@services/application/application.service.ts';
import { ApplicationStatusT } from '@services/status/applicationStatus.service.ts';
import { InterviewStatusT } from '@services/status/interviewStatusService.service.ts';
import { OfferStatusT } from '@services/status/offerStatus.service.ts';
import { ResponseStatusT } from '@services/status/responseStatus.service.ts';
import { FinalDestinationStatusT } from '@services/status/finalDestinationStatus.service.ts';
import { ApplicationOptionStatusesT } from '@hooks/applicationStatuses/useGetAllSelectOptions.tsx';

/*
*
* useHandleFormSubmission() validates and submits the formData towards the backend.
*
* handleValidation() - based on reactQuery cache - checks whether there is already a firm choice / final destination set in any of the user's applications.
* if there is no cache available, this task falls solely to the backend.
*
* submitForm() calls mutate() on reactQuery.
*/

export type UpdateApplicationFormFieldsT = {
  applicationStatusUuid: string | undefined;
  interviewStatusUuid: string | undefined;
  offerStatusUuid: string | undefined;
  responseStatusUuid: string | undefined;
  finalDestinationStatusUuid: string | undefined;
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
    const responseStatusCache = queryClient.getQueryData<ResponseStatusT[]>([queryKeys.RESPONSE_STATUS.GET_AS_SELECT_OPTIONS]);
    const finalDestinationStatusCache = queryClient.getQueryData<FinalDestinationStatusT[]>([queryKeys.FINAL_DESTINATION.GET_AS_SELECT_OPTIONS]);

    if (!applicationsCache || !responseStatusCache || !finalDestinationStatusCache) {
      return [];
    }

    const firmChoiceUuid = filterCacheByUuid(responseStatusCache, ResponseStatusE.FIRM_CHOICE);
    const finalDestinationUuid = filterCacheByUuid(finalDestinationStatusCache, FinalDestinationE.FINAL_DESTINATION);
    const finalDestinationDeferredUuid = filterCacheByUuid(finalDestinationStatusCache, FinalDestinationE.DEFERRED_ENTRY);

    applicationsCache.forEach((application) => {
      if (application.uuid !== applicationUuid) {
        if (application.responseStatus === ResponseStatusE.FIRM_CHOICE && formData.responseStatusUuid === firmChoiceUuid) {
          errors.push(firmChoiceSelectionError);
        }

        if (application.finalDestinationStatus === FinalDestinationE.FINAL_DESTINATION && formData.finalDestinationStatusUuid === finalDestinationUuid) {
          errors.push(finalDestinationSelectionError);
        }

        if (application.finalDestinationStatus === FinalDestinationE.DEFERRED_ENTRY && formData.finalDestinationStatusUuid === finalDestinationDeferredUuid) {
          errors.push(finalDestinationSelectionError);
        }
      }
    });

    return errors;
  };

  const submitForm = ({ formData, applicationUuid, mutate, setError }: FormSubmissionT) => {
    const validationError = handleValidation(formData, applicationUuid);

    if (!validationError.length) {
      const fieldKeys = Object.keys(formData) as (keyof UpdateApplicationFormFieldsT)[];

      for (const key in fieldKeys) {
        if (formData[fieldKeys[key]] === undefined) {
          formData[fieldKeys[key]] = '';
        }
      }

      mutate(formData);
    } else {
      setError('root.serverError', { message: validationError.join(' ') });
    }
  };

  return {
    submitForm,
  };
};

/*
*
* useUpdateApplication() is where the mutate() method is called.
* onSuccess() puts the updated values into cache.
* onError() shows error messages if there is any.
*
*/

type UpdateApplicationFormT = {
  setError: UseFormSetError<UpdateApplicationFormFieldsT>;
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

const useUpdateApplication = ({ setError, applicationUuid }: UpdateApplicationFormT) => {
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

/*
*
* useHandleFieldDisableStatuses() handles the logic connected to the individual field updates, i.e. when and which field should get disabled.
* the smaller helper methods set the field values on page load, while the individual update methods set the given field when a given select field is clicked.
*
*/

type ApplicationStatusesUnionT = ApplicationStatusT[] | InterviewStatusT[] | OfferStatusT[] | ResponseStatusT[] | FinalDestinationStatusT[];

type DisabledInputFieldsT = {
  currentApplicationData: ApplicationT;
  updatedData: ApplicationT | undefined;
  selectOptions: ApplicationOptionStatusesT;
}

const disableIfWithdrawn = (currentApplicationData: ApplicationT, updatedData: ApplicationT | undefined, applicationStatusOptions: ApplicationStatusT[] | undefined) => {
  const withdrawnStatus = applicationStatusOptions?.filter((element) => element.name === ApplicationStatusE.WITHDRAWN)[0] as ApplicationStatusT;

  return currentApplicationData.applicationStatus === withdrawnStatus.name || updatedData?.applicationStatus === withdrawnStatus.name;
};

const setPageLoadApplicationStatus = (currentApplicationData: ApplicationT) => {
  return Boolean(currentApplicationData.finalDestinationStatus);
};

const setPageLoadInterviewStatus = (currentApplicationData: ApplicationT, updatedData: ApplicationT | undefined, selectOptions: ApplicationOptionStatusesT) => {
  if (currentApplicationData.finalDestinationStatus || disableIfWithdrawn(currentApplicationData, updatedData, selectOptions.applicationStatus)) {
    return true;
  }

  const submittedStatus = selectOptions.applicationStatus?.filter((element) => element.name === ApplicationStatusE.SUBMITTED)[0] as ApplicationStatusT;

  return !(currentApplicationData.applicationStatus === submittedStatus.name || updatedData?.applicationStatus === submittedStatus.name);
};

const setPageLoadOfferStatus = (currentApplicationData: ApplicationT, updatedData: ApplicationT | undefined, selectOptions: ApplicationOptionStatusesT) => {
  if (!currentApplicationData.interviewStatus || currentApplicationData.finalDestinationStatus || disableIfWithdrawn(currentApplicationData, updatedData, selectOptions.applicationStatus)) {
    return true;
  }

  const notInvitedStatus = selectOptions.interviewStatus?.filter((element) => element.name === InterviewStatusE.NOT_INVITED)[0] as InterviewStatusT;

  return currentApplicationData.interviewStatus === notInvitedStatus.name || updatedData?.interviewStatus === notInvitedStatus.name;
};

const setPageLoadResponseStatus = (currentApplicationData: ApplicationT, updatedData: ApplicationT | undefined, selectOptions: ApplicationOptionStatusesT) => {
  if (!currentApplicationData.offerStatus || disableIfWithdrawn(currentApplicationData, updatedData, selectOptions.applicationStatus)) {
    return true;
  }

  const rejectedStatus = selectOptions.offerStatus?.filter((element) => element.name === OfferStatusE.REJECTED)[0] as OfferStatusT;

  return currentApplicationData.offerStatus === rejectedStatus.name || updatedData?.offerStatus === rejectedStatus.name;
};

const setPageLoadFinalDestinationStatus = (currentApplicationData: ApplicationT, updatedData: ApplicationT | undefined, selectOptions: ApplicationOptionStatusesT) => {
  if (!currentApplicationData.responseStatus || disableIfWithdrawn(currentApplicationData, updatedData, selectOptions.applicationStatus)) {
    return true;
  }

  const offerDeclinedStatus = selectOptions.responseStatus?.filter((element) => element.name === ResponseStatusE.OFFER_DECLINED)[0] as ResponseStatusT;

  return currentApplicationData.responseStatus === offerDeclinedStatus.name || updatedData?.responseStatus === offerDeclinedStatus.name;
};

const useHandleFieldDisableStatuses = ({ currentApplicationData, updatedData, selectOptions }: DisabledInputFieldsT) => {
  const [fieldDisabledStatuses, setFieldDisabledStatuses] = useState<{ [key: string]: boolean }>({
    applicationStatus: setPageLoadApplicationStatus(currentApplicationData),
    interviewStatus: setPageLoadInterviewStatus(currentApplicationData, updatedData, selectOptions),
    offerStatus: setPageLoadOfferStatus(currentApplicationData, updatedData, selectOptions),
    responseStatus: setPageLoadResponseStatus(currentApplicationData, updatedData, selectOptions),
    finalDestinationStatus: setPageLoadFinalDestinationStatus(currentApplicationData, updatedData, selectOptions),
  });

  const isStatusInList = (statusList: ApplicationStatusesUnionT, statusName: string) => {
    return statusList.some((element) => element.uuid === statusName);
  };

  const updateInterviewStatus = (eventTargetValue: string) => {
    const planned = selectOptions.applicationStatus?.filter((element) => element.name === ApplicationStatusE.SUBMITTED) as ApplicationStatusT[];
    const withdrawn = selectOptions.applicationStatus?.filter((element) => element.name === ApplicationStatusE.WITHDRAWN) as ApplicationStatusT[];

    if (eventTargetValue === planned[0].uuid) {
      setFieldDisabledStatuses({
        ...fieldDisabledStatuses,
        interviewStatus: false,
      });
    } else if (eventTargetValue === withdrawn[0].uuid) {
      setFieldDisabledStatuses({
        interviewStatus: true,
        offerStatus: true,
        responseStatus: true,
        finalDestinationStatus: true,
      });
    } else {
      setFieldDisabledStatuses({
        ...fieldDisabledStatuses,
        interviewStatus: true,
      });
    }
  };

  const updateOfferStatus = (eventTargetValue: string) => {
    const invitedStatuses = selectOptions.interviewStatus?.filter((element) => element.name !== InterviewStatusE.NOT_INVITED) as OfferStatusT[];

    if (isStatusInList(invitedStatuses, eventTargetValue)) {
      setFieldDisabledStatuses({
        ...fieldDisabledStatuses,
        offerStatus: false,
      });
    } else {
      setFieldDisabledStatuses({
        ...fieldDisabledStatuses,
        offerStatus: true,
        responseStatus: true,
        finalDestinationStatus: true,
      });
    }
  };

  const updateResponseStatus = (eventTargetValue: string) => {
    const positiveResponseStatuses = selectOptions.offerStatus?.filter((element) => element.name !== OfferStatusE.REJECTED) as ResponseStatusT[];

    if (isStatusInList(positiveResponseStatuses, eventTargetValue)) {
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
    const positiveResponseStatuses = selectOptions.responseStatus?.filter((element) => element.name !== ResponseStatusE.OFFER_DECLINED) as ResponseStatusT[];

    if (isStatusInList(positiveResponseStatuses, eventTargetValue)) {
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
    setFieldDisabledStatuses({
      applicationStatus: true,
      interviewStatus: true,
      offerStatus: true,
    });
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
  useHandleFormSubmission,
  useUpdateApplication,
  useHandleFieldDisableStatuses,
};
