/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 */

/* external imports */
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { UseFormSetError } from 'react-hook-form';

/* logic imports */
import { applicationStudentService } from '@services/index';

/* configuration imports */
import { mutationKeys, queryClient, queryKeys } from '@configuration';

/* utilities imports */
import { constants } from './application-form.constants';

/* interface, type, enum imports */
import {
  Application,
  ApplicationStatusE,
  FinalDestinationE,
  InterviewStatusE,
  MutationResult,
  OfferStatusE,
  ResponseStatusE,
  ServerValidationErrorResponse,
} from '@common-types';
import { UNEXPECTED_GLOBAL_ERROR, UNEXPECTED_SERVER_ERROR } from '@constants';
import { ApplicationStatusOption } from '@hooks/application-status/use-get-all-select-options';
import { ApplicationStatus } from '@services/status/application-status.service';
import { FinalDestinationStatus } from '@services/status/final-destination-status.service';
import { InterviewStatus } from '@services/status/interview-status-service.service';
import { OfferStatus } from '@services/status/offer-status.service';
import { ResponseStatus } from '@services/status/response-status.service';

/**
 * ===============
 * Shared Interfaces, Types, Enums
 * ===============
 */

/* interfaces, types, enums */
export type UpdateApplicationFormFields = {
  applicationStatusUuid: string | undefined;
  interviewStatusUuid: string | undefined;
  offerStatusUuid: string | undefined;
  responseStatusUuid: string | undefined;
  finalDestinationStatusUuid: string | undefined;
};

/**
 * ===============
 * Helper Method {@link filterCacheByUuid}
 * ===============
 */

type CachedData = {
  name: string;
  uuid: string;
};

/**
 * @description
 * The helper method used by {@link useHandleFormSubmission} filters various local `react-query` cache lists
 * by a given option name and returns the UUID of the first matching entry.
 *
 * @param {Array<T>} cache
 * The array of cached data to filter.
 * @param {string} optionName
 * The name of the option to match in the cached data.
 *
 * @returns {string}
 * The UUID of the first cached data entry that matches the provided option name.
 *
 * @since 0.0.1
 */
const filterCacheByUuid = <T extends CachedData>(cache: Array<T>, optionName: string): string => {
  const filteredOption: T = cache?.filter((option: T) => option.name === optionName)[0];

  return filteredOption.uuid;
};

/**
 * ===============
 * Custom Hook {@link useHandleFormSubmission}
 * ===============
 */

type FormSubmissionT = {
  formData: UpdateApplicationFormFields;
  applicationUuid: string;
  mutate: (formData: UpdateApplicationFormFields) => void;
  setError: UseFormSetError<UpdateApplicationFormFields>;
};

export interface HandleFormSubmission {
  submitForm: ({ formData, applicationUuid, mutate, setError }: FormSubmissionT) => void;
}

/**
 * @description
 * The custom hook manages the {@link LoginForm} submission process, including REST API request, error handling,
 * and post-success actions, such as setting account context and authentication status.
 *
 * @returns {HandleFormSubmission}
 * An object containing:
 * - a `submitForm` void method
 *
 * @since 0.0.1
 */
export const useHandleFormSubmission = (): HandleFormSubmission => {
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
          errors.push(constants.ui.errors.FIRM_CHOICE_SELECTION);
        }

        if (
          (application.finalDestinationStatus === FinalDestinationE.FINAL_DESTINATION &&
            formData.finalDestinationStatusUuid === finalDestinationUuid) ||
          (application.finalDestinationStatus === FinalDestinationE.DEFERRED_ENTRY &&
            formData.finalDestinationStatusUuid === finalDestinationDeferredUuid)
        ) {
          errors.push(constants.ui.errors.FINAL_DESTINATION_SELECTION);
        }
      }
    });

    return errors;
  };

  const submitForm = ({ formData, applicationUuid, mutate, setError }: FormSubmissionT): void => {
    const validationErrors: Array<string> = handleValidation(formData, applicationUuid);

    if (!validationErrors.length) {
      const fieldKeys = Object.keys(formData) as Array<keyof UpdateApplicationFormFields>;

      for (const key in fieldKeys) {
        if (formData[fieldKeys[key]] === undefined) {
          formData[fieldKeys[key]] = '';
        }
      }

      mutate(formData);
    } else {
      setError('root', { message: validationErrors.join(' ') });
    }
  };

  return {
    submitForm,
  };
};

/**
 * ===============
 * Custom Hook {@link useUpdateApplication}
 * ===============
 */

/* interfaces, types, enums */
interface UpdateApplication {
  setError: UseFormSetError<UpdateApplicationFormFields>;
  applicationUuid: string;
}

type UpdateApplicationFormErrorT =
  | 'root'
  | 'applicationStatusUuid'
  | 'interviewStatusUuid'
  | 'offerStatusUuid'
  | 'responseStatusUuid'
  | 'finalDestinationStatusUuid';

export type UpdateApplicationForm = MutationResult<
  Application,
  AxiosError<Array<ServerValidationErrorResponse>>,
  UpdateApplicationFormFields
>;

/**
 * @description
 * The custom hook manages the POST GET API call.
 *
 * @param {UseFormSetError<UpdateApplicationFormFields>} params.setError
 * `react-hook-form`'s error setting method.
 * @param {string} params.applicationUuid
 * The application's UUID.
 *
 * @returns {UpdateApplication}
 * A `react-query` mutation object.
 *
 * @since 0.0.1
 */
export const useUpdateApplication = ({ setError, applicationUuid }: UpdateApplication): UpdateApplicationForm => {
  return useMutation({
    mutationKey: [mutationKeys.application.PATCH_BY_UUID],
    mutationFn: (formData: UpdateApplicationFormFields) => applicationStudentService.patchByUuid(formData, applicationUuid),
    onSuccess: (response: Application) => {
      queryClient.setQueryData<Array<Application>>([queryKeys.application.GET_ALL_BY_ROLE], (applications) => {
        if (!applications) {
          return;
        }

        const filteredList: Array<Application> = applications.filter((application: Application) => application.uuid !== response.uuid);

        return [...filteredList, response];
      });

      history.replaceState(response, '', `/applications/view/${response.uuid}`);
    },
    onError: (error: AxiosError<Array<ServerValidationErrorResponse>>) => {
      if (axios.isAxiosError(error)) {
        const status: number | undefined = error.response?.status;
        const errors: Array<ServerValidationErrorResponse> | undefined = error.response?.data;

        if (status) {
          if (status === 400 && errors) {
            errors.forEach((error: ServerValidationErrorResponse) => {
              if (error.fieldName) {
                setError(error.fieldName as UpdateApplicationFormErrorT, { message: error.errorMessage });
              }
            });
          } else if (status >= 500) {
            setError('root', { message: UNEXPECTED_SERVER_ERROR });
          }
        }
      } else {
        setError('root', { message: UNEXPECTED_GLOBAL_ERROR });
      }
    },
  });
};

/**
 * ===============
 * Helper Method {@link disableIfWithdrawn}
 * ===============
 */

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

/**
 * ===============
 * Helper Service {@link pageLoadFieldSetup}
 * ===============
 */

/* interfaces, types, enums */
interface PageLoadFieldSetup {
  applicationStatus: (application: Application) => boolean;
  interviewStatus: (application: Application, updatedData: Application | undefined, selectOptions: ApplicationStatusOption) => boolean;
  offerStatus: (application: Application, updatedData: Application | undefined, selectOptions: ApplicationStatusOption) => boolean;
  responseStatus: (application: Application, updatedData: Application | undefined, selectOptions: ApplicationStatusOption) => boolean;
  finalDestinationStatus: (
    application: Application,
    updatedData: Application | undefined,
    selectOptions: ApplicationStatusOption,
  ) => boolean;
}

const pageLoadFieldSetup: PageLoadFieldSetup = {
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

/**
 * ===============
 * Helper Method {@link isStatusInList}
 * ===============
 */

/* interfaces, types, enums */
type ApplicationStatusUnion =
  | Array<ApplicationStatus>
  | Array<InterviewStatus>
  | Array<OfferStatus>
  | Array<ResponseStatus>
  | Array<FinalDestinationStatus>;

const isStatusInList = (statusList: ApplicationStatusUnion, statusName: string): boolean => {
  return statusList.some((element) => element.uuid === statusName);
};

/**
 * ===============
 * Custom Hook {@link useHandleFieldDisableStatuses}
 * ===============
 */

/* interfaces, types, enums */
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
