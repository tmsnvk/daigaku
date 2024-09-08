/**
 * @prettier
 */

/* external imports */
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { UseFormSetError } from 'react-hook-form';

/* service imports */
import { applicationStudentService } from '@services/application/application-student.service';

/* configuration imports */
import { mutationKeys, queryClient, queryKeys } from '@configuration';

/* utilities imports */
import { finalDestinationSelectionError, firmChoiceSelectionError } from './application-form.utilities';

/* interface, type, enum imports */
import { Application, ApplicationStatusE, FinalDestinationE, InterviewStatusE, OfferStatusE, ResponseStatusE } from '@common-types';
import { ApplicationStatusOption } from '@hooks/application-status/use-get-all-select-options';
import { ApplicationStatus } from '@services/status/application-status.service';
import { FinalDestinationStatus } from '@services/status/final-destination-status.service';
import { InterviewStatus } from '@services/status/interview-status-service.service';
import { OfferStatus } from '@services/status/offer-status.service';
import { ResponseStatus } from '@services/status/response-status.service';

/* interfaces, types, enums */
export type UpdateApplicationFormFields = {
  applicationStatusUuid: string | undefined;
  interviewStatusUuid: string | undefined;
  offerStatusUuid: string | undefined;
  responseStatusUuid: string | undefined;
  finalDestinationStatusUuid: string | undefined;
};

type FormSubmissionT = {
  formData: UpdateApplicationFormFields;
  applicationUuid: string;
  mutate: (formData: UpdateApplicationFormFields) => void;
  setError: UseFormSetError<UpdateApplicationFormFields>;
};

type CachedData = {
  name: string;
  uuid: string;
};

const filterCacheByUuid = <T extends CachedData>(cache: T[], optionName: string): string => {
  const filteredOption = cache?.filter((option) => option.name === optionName)[0];

  return filteredOption.uuid;
};

export interface HandleFormSubmissionHook {
  submitForm: ({ formData, applicationUuid, mutate, setError }: FormSubmissionT) => void;
}

/*
 *
 * custom hook - useHandleFormSubmission()
 * it validates and submits the formData towards the backend.
 *
 *  * handleValidation() - based on reactQuery cache - checks whether there is already a firm choice / final destination set in any of the user's applications.
 * if there is no cache available, this task falls solely to the backend.
 *
 * submitForm() calls mutate() on reactQuery.
 *
 */
export const useHandleFormSubmission = () => {
  const handleValidation = (formData: UpdateApplicationFormFields, applicationUuid: string): Array<string> => {
    const errors: Array<string> = [];

    const applicationsCache: Array<Application> | undefined = queryClient.getQueryData<Array<Application>>([
      queryKeys.application.GET_ALL_BY_ROLE,
    ]);
    const responseStatusCache: Array<ResponseStatus> | undefined = queryClient.getQueryData<Array<ResponseStatus>>([
      queryKeys.RESPONSE_STATUS.GET_AS_SELECT_OPTIONS,
    ]);
    const finalDestinationStatusCache: Array<FinalDestinationStatus> | undefined = queryClient.getQueryData<Array<FinalDestinationStatus>>([
      queryKeys.FINAL_DESTINATION.GET_AS_SELECT_OPTIONS,
    ]);

    if (!applicationsCache || !responseStatusCache || !finalDestinationStatusCache) {
      return errors;
    }

    const firmChoiceUuid: string = filterCacheByUuid(responseStatusCache, ResponseStatusE.FIRM_CHOICE);
    const finalDestinationUuid: string = filterCacheByUuid(finalDestinationStatusCache, FinalDestinationE.FINAL_DESTINATION);
    const finalDestinationDeferredUuid: string = filterCacheByUuid(finalDestinationStatusCache, FinalDestinationE.DEFERRED_ENTRY);

    applicationsCache.forEach((application: Application) => {
      if (application.uuid !== applicationUuid) {
        if (application.responseStatus === ResponseStatusE.FIRM_CHOICE && formData.responseStatusUuid === firmChoiceUuid) {
          errors.push(firmChoiceSelectionError);
        }

        if (
          (application.finalDestinationStatus === FinalDestinationE.FINAL_DESTINATION &&
            formData.finalDestinationStatusUuid === finalDestinationUuid) ||
          (application.finalDestinationStatus === FinalDestinationE.DEFERRED_ENTRY &&
            formData.finalDestinationStatusUuid === finalDestinationDeferredUuid)
        ) {
          errors.push(finalDestinationSelectionError);
        }
      }
    });

    return errors;
  };

  const submitForm = ({ formData, applicationUuid, mutate, setError }: FormSubmissionT): void => {
    const validationError: Array<string> = handleValidation(formData, applicationUuid);

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

/* interfaces, types, enums */
interface UpdateApplicationForm {
  setError: UseFormSetError<UpdateApplicationFormFields>;
  applicationUuid: string;
}

type UpdateApplicationFormErrorFieldsT =
  | `root.${string}`
  | 'root'
  | 'applicationStatusUuid'
  | 'interviewStatusUuid'
  | 'offerStatusUuid'
  | 'responseStatusUuid'
  | 'finalDestinationStatusUuid';

export interface UpdateApplicationFormError {
  response: {
    status: number;
    data: {
      [key: string]: UpdateApplicationFormErrorFieldsT;
    };
  };
}

/*
 * custom hook - useUpdateApplication()
 * it is where application update API call is executed.
 *
 * onSuccess() puts the updated values into cache.
 *
 * onError() shows error messages if there is any error.
 *
 */
export const useUpdateApplication = ({ setError, applicationUuid }: UpdateApplicationForm) => {
  return useMutation({
    mutationKey: [mutationKeys.APPLICATION.PATCH_BY_UUID],
    mutationFn: (data: UpdateApplicationFormFields) => applicationStudentService.patchByUuid(data, applicationUuid),
    onSuccess: (data: Application) => {
      queryClient.setQueryData<Array<Application>>([queryKeys.application.GET_ALL_BY_ROLE], (applications) => {
        if (!applications) {
          return;
        }

        const filteredList: Array<Application> = applications.filter((application: Application) => application.uuid !== data.uuid);

        return [...filteredList, data];
      });

      history.replaceState(data, '', `/applications/view/${data.uuid}`);
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

/* interfaces, types, enums */
type ApplicationStatusUnion =
  | Array<ApplicationStatus>
  | Array<InterviewStatus>
  | Array<OfferStatus>
  | Array<ResponseStatus>
  | Array<FinalDestinationStatus>;

interface DisabledInputFields {
  application: Application;
  updatedData: Application | undefined;
  selectOptions: ApplicationStatusOption;
}

interface FieldsReadOnlyStatus {
  isApplicationStatusReadOnly: boolean;
  isInterviewStatusReadOnly: boolean;
  isOfferStatusReadOnly: boolean;
  isResponseStatusReadOnly: boolean;
  isFinalDestinationStatusReadOnly: boolean;
}

const disableIfWithdrawn = (
  application: Application,
  updatedData: Application | undefined,
  applicationStatusOptions: Array<ApplicationStatus> | undefined,
): boolean => {
  const withdrawnStatus: ApplicationStatus | undefined = applicationStatusOptions?.filter((element) => {
    return element.name === ApplicationStatusE.WITHDRAWN;
  })[0];

  if (withdrawnStatus) {
    return application.applicationStatus === withdrawnStatus.name || updatedData?.applicationStatus === withdrawnStatus.name;
  }

  return false;
};

const pageLoadFieldSetup = {
  applicationStatus: (application: Application): boolean => {
    return !!application.finalDestinationStatus;
  },
  interviewStatus: (application: Application, updatedData: Application | undefined, selectOptions: ApplicationStatusOption): boolean => {
    if (application.finalDestinationStatus || disableIfWithdrawn(application, updatedData, selectOptions.applicationStatus)) {
      return true;
    }

    const submittedStatus: ApplicationStatus | undefined = selectOptions.applicationStatus?.filter((element: ApplicationStatus) => {
      return element.name === ApplicationStatusE.SUBMITTED;
    })[0];

    if (submittedStatus) {
      return !(application.applicationStatus === submittedStatus.name || updatedData?.applicationStatus === submittedStatus.name);
    }

    return false;
  },
  offerStatus: (application: Application, updatedData: Application | undefined, selectOptions: ApplicationStatusOption): boolean => {
    if (
      !application.interviewStatus ||
      application.finalDestinationStatus ||
      disableIfWithdrawn(application, updatedData, selectOptions.applicationStatus)
    ) {
      return true;
    }

    const notInvitedStatus: InterviewStatus | undefined = selectOptions.interviewStatus?.filter((element: ApplicationStatus) => {
      return element.name === InterviewStatusE.NOT_INVITED;
    })[0];

    if (notInvitedStatus) {
      return application.interviewStatus === notInvitedStatus.name || updatedData?.interviewStatus === notInvitedStatus.name;
    }

    return false;
  },
  responseStatus: (application: Application, updatedData: Application | undefined, selectOptions: ApplicationStatusOption): boolean => {
    if (!application.offerStatus || disableIfWithdrawn(application, updatedData, selectOptions.applicationStatus)) {
      return true;
    }

    const rejectedStatus: OfferStatus | undefined = selectOptions.offerStatus?.filter((element: ApplicationStatus) => {
      return element.name === OfferStatusE.REJECTED;
    })[0];

    if (rejectedStatus) {
      return application.offerStatus === rejectedStatus.name || updatedData?.offerStatus === rejectedStatus.name;
    }

    return false;
  },
  finalDestinationStatus: (
    application: Application,
    updatedData: Application | undefined,
    selectOptions: ApplicationStatusOption,
  ): boolean => {
    if (!application.responseStatus || disableIfWithdrawn(application, updatedData, selectOptions.applicationStatus)) {
      return true;
    }

    const offerDeclinedStatus: ResponseStatus | undefined = selectOptions.responseStatus?.filter((element: ApplicationStatus) => {
      return element.name === ResponseStatusE.OFFER_DECLINED;
    })[0];

    if (offerDeclinedStatus) {
      return application.responseStatus === offerDeclinedStatus.name || updatedData?.responseStatus === offerDeclinedStatus.name;
    }

    return false;
  },
};

const isStatusInList = (statusList: ApplicationStatusUnion, statusName: string): boolean => {
  return statusList.some((element) => element.uuid === statusName);
};

/*
 *
 * custom hook - useHandleFieldDisableStatuses()
 * it handles the logic connected to the individual field updates, i.e. when and which field should get disabled.
 * the helper methods set the field values on page load, while the individual update methods set the given field when a select field is clicked.
 *
 */
export const useHandleFieldDisableStatuses = ({ application, updatedData, selectOptions }: DisabledInputFields) => {
  const [fieldsReadOnlyStatus, setFieldsReadOnlyStatus] = useState<FieldsReadOnlyStatus>({
    isApplicationStatusReadOnly: pageLoadFieldSetup.applicationStatus(application),
    isInterviewStatusReadOnly: pageLoadFieldSetup.interviewStatus(application, updatedData, selectOptions),
    isOfferStatusReadOnly: pageLoadFieldSetup.offerStatus(application, updatedData, selectOptions),
    isResponseStatusReadOnly: pageLoadFieldSetup.responseStatus(application, updatedData, selectOptions),
    isFinalDestinationStatusReadOnly: pageLoadFieldSetup.finalDestinationStatus(application, updatedData, selectOptions),
  });

  const updateInterviewStatus = (eventTargetValue: string): void => {
    const planned: ApplicationStatus | undefined = selectOptions.applicationStatus?.filter((element: ApplicationStatus) => {
      return element.name === ApplicationStatusE.SUBMITTED;
    })[0];
    const withdrawn: ApplicationStatus | undefined = selectOptions.applicationStatus?.filter((element: ApplicationStatus) => {
      return element.name === ApplicationStatusE.WITHDRAWN;
    })[0];

    if (planned && eventTargetValue === planned.uuid) {
      setFieldsReadOnlyStatus({
        ...fieldsReadOnlyStatus,
        isInterviewStatusReadOnly: false,
      });
    } else if (withdrawn && eventTargetValue === withdrawn.uuid) {
      setFieldsReadOnlyStatus({
        ...fieldsReadOnlyStatus,
        isInterviewStatusReadOnly: true,
        isOfferStatusReadOnly: true,
        isResponseStatusReadOnly: true,
        isFinalDestinationStatusReadOnly: true,
      });
    } else {
      setFieldsReadOnlyStatus({
        ...fieldsReadOnlyStatus,
        isInterviewStatusReadOnly: true,
      });
    }
  };

  const updateOfferStatus = (eventTargetValue: string): void => {
    const invitedStatuses: Array<OfferStatus> | undefined = selectOptions.interviewStatus?.filter((element: InterviewStatus) => {
      return element.name !== InterviewStatusE.NOT_INVITED;
    });

    if (invitedStatuses) {
      if (isStatusInList(invitedStatuses, eventTargetValue)) {
        setFieldsReadOnlyStatus({
          ...fieldsReadOnlyStatus,
          isOfferStatusReadOnly: false,
        });
      } else {
        setFieldsReadOnlyStatus({
          ...fieldsReadOnlyStatus,
          isOfferStatusReadOnly: true,
          isResponseStatusReadOnly: true,
          isFinalDestinationStatusReadOnly: true,
        });
      }
    }
  };

  const updateResponseStatus = (eventTargetValue: string): void => {
    const positiveResponseStatuses: Array<ResponseStatus> | undefined = selectOptions.offerStatus?.filter((element: OfferStatus) => {
      return element.name !== OfferStatusE.REJECTED;
    });

    if (positiveResponseStatuses) {
      if (isStatusInList(positiveResponseStatuses, eventTargetValue)) {
        setFieldsReadOnlyStatus({
          ...fieldsReadOnlyStatus,
          isResponseStatusReadOnly: false,
        });
      } else {
        setFieldsReadOnlyStatus({
          ...fieldsReadOnlyStatus,
          isResponseStatusReadOnly: true,
        });
      }
    }
  };

  const updateFinalDestinationStatus = (eventTargetValue: string): void => {
    const positiveResponseStatuses: Array<ResponseStatus> | undefined = selectOptions.responseStatus?.filter((element: ResponseStatus) => {
      return element.name !== ResponseStatusE.OFFER_DECLINED;
    });

    if (positiveResponseStatuses) {
      if (isStatusInList(positiveResponseStatuses, eventTargetValue)) {
        setFieldsReadOnlyStatus({
          ...fieldsReadOnlyStatus,
          isFinalDestinationStatusReadOnly: false,
        });
      } else {
        setFieldsReadOnlyStatus({
          ...fieldsReadOnlyStatus,
          isFinalDestinationStatusReadOnly: true,
        });
      }
    }
  };

  const disableFieldsOnFinalDestinationUpdate = (): void => {
    setFieldsReadOnlyStatus({
      ...fieldsReadOnlyStatus,
      isApplicationStatusReadOnly: true,
      isInterviewStatusReadOnly: true,
      isOfferStatusReadOnly: true,
    });
  };

  return {
    fieldsReadOnlyStatus,
    updateInterviewStatus,
    updateOfferStatus,
    updateResponseStatus,
    updateFinalDestinationStatus,
    disableFieldsOnFinalDestinationUpdate,
  };
};
