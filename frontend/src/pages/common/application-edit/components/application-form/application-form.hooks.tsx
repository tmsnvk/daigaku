import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';

import applicationStudentService from '@services/application/application-student.service';

import {
  mutationKeys,
  queryClient,
  queryKeys,
} from '@configuration';

import {
  finalDestinationSelectionError,
  firmChoiceSelectionError,
} from './application-form.utilities';

import {
  ApplicationStatusE,
  FinalDestinationE,
  InterviewStatusE,
  OfferStatusE,
  ResponseStatusE,
} from '@constants/application-status.enum';
import { Application } from '@custom-types/index';
import { ApplicationStatus } from '@services/status/application-status.service';
import { InterviewStatus } from '@services/status/interview-status-service.service';
import { OfferStatus } from '@services/status/offer-status.service';
import { ResponseStatus } from '@services/status/response-status.service';
import { FinalDestinationStatus } from '@services/status/final-destination-status.service';
import { ApplicationOptionStatuses } from '@hooks/application-status/use-get-all-select-options';

/*
*
* useHandleFormSubmission() validates and submits the formData towards the backend.
*
* handleValidation() - based on reactQuery cache - checks whether there is already a firm choice / final destination set in any of the user's applications.
* if there is no cache available, this task falls solely to the backend.
*
* submitForm() calls mutate() on reactQuery.
*/

export type UpdateApplicationFormFields = {
  applicationStatusUuid: string | undefined;
  interviewStatusUuid: string | undefined;
  offerStatusUuid: string | undefined;
  responseStatusUuid: string | undefined;
  finalDestinationStatusUuid: string | undefined;
}

type FormSubmissionT = {
  formData: UpdateApplicationFormFields;
  applicationUuid: string;
  mutate: (formData: UpdateApplicationFormFields) => void;
  setError: UseFormSetError<UpdateApplicationFormFields>;
}

type CachedData = {
  name: string;
  uuid: string;
};

const filterCacheByUuid = <T extends CachedData> (cache: T[], optionName: string): string => {
  const filteredOption = cache?.filter((option) => option.name === optionName)[0];

  return filteredOption.uuid;
};

export interface HandleFormSubmissionHook {
  submitForm: ({ formData, applicationUuid, mutate, setError }: FormSubmissionT) => void;
}

const useHandleFormSubmission = () => {
  const handleValidation = (formData: UpdateApplicationFormFields, applicationUuid: string) => {
    const errors: string[] = [];

    const applicationsCache = queryClient.getQueryData<Application[]>([queryKeys.APPLICATION.GET_ALL_BY_ROLE]);
    const responseStatusCache = queryClient.getQueryData<ResponseStatus[]>([queryKeys.RESPONSE_STATUS.GET_AS_SELECT_OPTIONS]);
    const finalDestinationStatusCache = queryClient.getQueryData<FinalDestinationStatus[]>([queryKeys.FINAL_DESTINATION.GET_AS_SELECT_OPTIONS]);

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

  const submitForm = ({ formData, applicationUuid, mutate, setError }: FormSubmissionT): void => {
    const validationError = handleValidation(formData, applicationUuid);

    if (!validationError.length) {
      const fieldKeys = Object.keys(formData) as (keyof UpdateApplicationFormFields)[];

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
* useUpdateApplication() is where application update API call is executed.
* onSuccess() puts the updated values into cache.
* onError() shows error messages if there is any error.
*
*/

interface UpdateApplicationForm {
  setError: UseFormSetError<UpdateApplicationFormFields>;
  applicationUuid: string;
}

type UpdateApplicationFormErrorFieldsT =
  `root.${string}` |
  'root' |
  'applicationStatusUuid' |
  'interviewStatusUuid' |
  'offerStatusUuid' |
  'responseStatusUuid' |
  'finalDestinationStatusUuid';

export interface UpdateApplicationFormError {
  response: {
    status: number;
    data: {
      [key: string]: UpdateApplicationFormErrorFieldsT;
    }
  }
}

const useUpdateApplication = ({ setError, applicationUuid }: UpdateApplicationForm) => {
  return useMutation({
    mutationKey: [mutationKeys.APPLICATION.PATCH_BY_UUID],
    mutationFn: (data: UpdateApplicationFormFields) => applicationStudentService.patchByUuid(data, applicationUuid),
    onSuccess: (data: Application) => {
      queryClient.setQueryData<Array<Application>>(
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
    onError: (error: UpdateApplicationFormError) => {
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
* the helper methods set the field values on page load, while the individual update methods set the given field when a select field is clicked.
*
*/

type ApplicationStatusesUnionT = ApplicationStatus[] | InterviewStatus[] | OfferStatus[] | ResponseStatus[] | FinalDestinationStatus[];

interface DisabledInputFields {
  currentApplicationData: Application;
  updatedData: Application | undefined;
  selectOptions: ApplicationOptionStatuses;
}

const disableIfWithdrawn = (currentApplicationData: Application, updatedData: Application | undefined, applicationStatusOptions: ApplicationStatus[] | undefined) => {
  const withdrawnStatus = applicationStatusOptions?.filter((element) => element.name === ApplicationStatusE.WITHDRAWN)[0] as ApplicationStatus;

  return currentApplicationData.applicationStatus === withdrawnStatus.name || updatedData?.applicationStatus === withdrawnStatus.name;
};

const setPageLoadApplicationStatus = (currentApplicationData: Application) => {
  return !!currentApplicationData.finalDestinationStatus;
};

const setPageLoadInterviewStatus = (currentApplicationData: Application, updatedData: Application | undefined, selectOptions: ApplicationOptionStatuses) => {
  if (currentApplicationData.finalDestinationStatus || disableIfWithdrawn(currentApplicationData, updatedData, selectOptions.applicationStatus)) {
    return true;
  }

  const submittedStatus = selectOptions.applicationStatus?.filter((element) => element.name === ApplicationStatusE.SUBMITTED)[0] as ApplicationStatus;

  return !(currentApplicationData.applicationStatus === submittedStatus.name || updatedData?.applicationStatus === submittedStatus.name);
};

const setPageLoadOfferStatus = (currentApplicationData: Application, updatedData: Application | undefined, selectOptions: ApplicationOptionStatuses) => {
  if (!currentApplicationData.interviewStatus || currentApplicationData.finalDestinationStatus || disableIfWithdrawn(currentApplicationData, updatedData, selectOptions.applicationStatus)) {
    return true;
  }

  const notInvitedStatus = selectOptions.interviewStatus?.filter((element) => element.name === InterviewStatusE.NOT_INVITED)[0] as InterviewStatus;

  return currentApplicationData.interviewStatus === notInvitedStatus.name || updatedData?.interviewStatus === notInvitedStatus.name;
};

const setPageLoadResponseStatus = (currentApplicationData: Application, updatedData: Application | undefined, selectOptions: ApplicationOptionStatuses) => {
  if (!currentApplicationData.offerStatus || disableIfWithdrawn(currentApplicationData, updatedData, selectOptions.applicationStatus)) {
    return true;
  }

  const rejectedStatus = selectOptions.offerStatus?.filter((element) => element.name === OfferStatusE.REJECTED)[0] as OfferStatus;

  return currentApplicationData.offerStatus === rejectedStatus.name || updatedData?.offerStatus === rejectedStatus.name;
};

const setPageLoadFinalDestinationStatus = (currentApplicationData: Application, updatedData: Application | undefined, selectOptions: ApplicationOptionStatuses) => {
  if (!currentApplicationData.responseStatus || disableIfWithdrawn(currentApplicationData, updatedData, selectOptions.applicationStatus)) {
    return true;
  }

  const offerDeclinedStatus = selectOptions.responseStatus?.filter((element) => element.name === ResponseStatusE.OFFER_DECLINED)[0] as ResponseStatus;

  return currentApplicationData.responseStatus === offerDeclinedStatus.name || updatedData?.responseStatus === offerDeclinedStatus.name;
};

const useHandleFieldDisableStatuses = ({ currentApplicationData, updatedData, selectOptions }: DisabledInputFields) => {
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
    const planned = selectOptions.applicationStatus?.filter((element) => element.name === ApplicationStatusE.SUBMITTED) as ApplicationStatus[];
    const withdrawn = selectOptions.applicationStatus?.filter((element) => element.name === ApplicationStatusE.WITHDRAWN) as ApplicationStatus[];

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
    const invitedStatuses = selectOptions.interviewStatus?.filter((element) => element.name !== InterviewStatusE.NOT_INVITED) as OfferStatus[];

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
    const positiveResponseStatuses = selectOptions.offerStatus?.filter((element) => element.name !== OfferStatusE.REJECTED) as ResponseStatus[];

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
    const positiveResponseStatuses = selectOptions.responseStatus?.filter((element) => element.name !== ResponseStatusE.OFFER_DECLINED) as ResponseStatus[];

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

  const disableFieldsOnFinalDestinationUpdate = () => {
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
    disableFieldsOnFinalDestinationUpdate,
  };
};

export {
  useHandleFormSubmission,
  useUpdateApplication,
  useHandleFieldDisableStatuses,
};
