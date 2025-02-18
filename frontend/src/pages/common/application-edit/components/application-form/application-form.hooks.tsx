/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { UseFormSetError } from 'react-hook-form';

/* logic imports */
import { applicationStudentService } from '@services';

/* configuration, utilities, constants imports */
import { mutationKeys, queryClient, queryKeys } from '@configuration';
import { errorConstants } from '@constants';
import { constants } from './application-form.constants';

/* interface, type, enum imports */
import {
  Application,
  ApplicationStatus,
  ApplicationStatusE,
  ApplicationStatusSelectOptions,
  ApplicationStatusUnion,
  CoreErrorResponse,
  ErrorDetail,
  FinalDestinationStatus,
  FinalDestinationStatusE,
  InterviewStatus,
  InterviewStatusE,
  OfferStatus,
  OfferStatusE,
  ResponseStatus,
  ResponseStatusE,
  UpdateApplicationByStudent,
} from '@common-types';
import { FieldsReadOnlyStatus, HandleFieldDisableStatus, HandleFormSubmission, PageLoadValidationService } from './application-form.models';

/**
 * The helper method used by {@link useHandleFormSubmission} filters various local `react-query` cache lists
 * by the provided option name and returns the uuid of the first matching entry.
 *
 * @param cache The array of cached data to filter.
 * @param optionName The name of the option to match in the cached data.
 * @returns {string} The uuid of the first cached data entry that matches the provided option name.
 */
const filterCacheByUuid = <T extends ApplicationStatusUnion>(cache: Array<T>, optionName: string): string => {
  const filteredOption: T = cache?.filter((option: T) => option.name === optionName)[0];

  return filteredOption.uuid;
};

/**
 * The helper method finds the provided local `react-query` cache type.
 *
 * @template T The `react-query` cache type.
 * @param querykey The cache's query key identifier.
 * @returns {Array<T> | undefined}
 */
const findQueryCache = <T extends object>(queryKey: string): Array<T> | undefined => {
  return queryClient.getQueryData<Array<T>>([queryKey]);
};

/**
 * Manages the form submission's first step.
 * It checks if the user already has an {@link Application} set to either {@link ResponseStatusE.FIRM_CHOICE},
 * {@link FinalDestinationStatusE.FINAL_DESTINATION} or {@link FinalDestinationStatusE.DEFERRED_ENTRY}.
 * If yes, an error message stops the submission. If no error was found, the submitForm() method calls the `react-query` mutate() method.
 *
 * @return {HandleFormSubmission}
 */
export const useHandleFormSubmission = (): HandleFormSubmission => {
  const handleValidation = (formData: UpdateApplicationByStudent, currentApplicationUuid: string): Array<string> => {
    const errors: Array<string> = [];

    // Find application, response, and final destination status react-query caches.
    const applicationsCache: Array<Application> | undefined = findQueryCache<Application>(queryKeys.application.GET_ALL_BY_ROLE);
    const responseStatusCache: Array<ResponseStatus> | undefined = findQueryCache<ResponseStatus>(
      queryKeys.RESPONSE_STATUS.GET_AS_SELECT_OPTIONS,
    );
    const finalDestinationStatusCache: Array<FinalDestinationStatus> | undefined = findQueryCache(
      queryKeys.FINAL_DESTINATION.GET_AS_SELECT_OPTIONS,
    );

    if (!applicationsCache || !responseStatusCache || !finalDestinationStatusCache) {
      return errors;
    }

    // Find the three specific status uuid strings.
    const firmChoiceUuid: string = filterCacheByUuid(responseStatusCache, ResponseStatusE.FIRM_CHOICE);
    const finalDestinationUuid: string = filterCacheByUuid(finalDestinationStatusCache, FinalDestinationStatusE.FINAL_DESTINATION);
    const finalDestinationDeferredUuid: string = filterCacheByUuid(finalDestinationStatusCache, FinalDestinationStatusE.DEFERRED_ENTRY);

    // Check each application (except for the current) if they have any of the three status set.
    // If yes, error messages are thrown to the UI and the submission is stopped before hitting the API call.
    applicationsCache.forEach((application: Application) => {
      if (application.uuid !== currentApplicationUuid) {
        if (application.responseStatus?.name === ResponseStatusE.FIRM_CHOICE && formData.responseStatusUuid === firmChoiceUuid) {
          errors.push(constants.notifications.errors.FIRM_CHOICE_SELECTION);
        }

        if (
          (application.finalDestinationStatus?.name === FinalDestinationStatusE.FINAL_DESTINATION &&
            formData.finalDestinationStatusUuid === finalDestinationUuid) ||
          (application.finalDestinationStatus?.name === FinalDestinationStatusE.DEFERRED_ENTRY &&
            formData.finalDestinationStatusUuid === finalDestinationDeferredUuid)
        ) {
          errors.push(constants.notifications.errors.FINAL_DESTINATION_SELECTION);
        }
      }
    });

    return errors;
  };

  const submitForm = (
    formData: UpdateApplicationByStudent,
    currentApplicationUuid: string,
    mutate: (formData: UpdateApplicationByStudent) => void,
    setError: UseFormSetError<UpdateApplicationByStudent>,
  ): void => {
    const validationErrors: Array<string> = handleValidation(formData, currentApplicationUuid);

    if (!validationErrors.length) {
      const fieldKeys = Object.keys(formData) as Array<keyof UpdateApplicationByStudent>;

      // Disabled inputs are returned as undefined.
      // These undefined inputs are replaced with an empty string, so the backend uuid validation would not fail.
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
 * Defines the possible error field names in the {@link useUpdateApplication} custom hook.
 */
type UpdateApplicationFormErrorT =
  | 'root'
  | 'applicationStatusUuid'
  | 'interviewStatusUuid'
  | 'offerStatusUuid'
  | 'responseStatusUuid'
  | 'finalDestinationStatusUuid';

/**
 * Manages the {@link ApplicationForm} submission process, including REST API request, error handling,
 * and post-success actions, such as setting account context and authentication status.
 *
 * @param setError `react-hook-form`'s error setting method.
 * @param applicationUuid The application's uuid string.
 * @return {UseMutationResult<Application, AxiosError<CoreErrorResponse>, UpdateApplicationByStudent>}
 */
export const useUpdateApplication = (
  setError: UseFormSetError<UpdateApplicationByStudent>,
  applicationUuid: string,
): UseMutationResult<Application, AxiosError<CoreErrorResponse>, UpdateApplicationByStudent> => {
  return useMutation({
    mutationKey: [mutationKeys.application.PATCH_BY_UUID],
    mutationFn: (formData: UpdateApplicationByStudent) => applicationStudentService.patchByUuid(formData, applicationUuid),
    onSuccess: (response: Application) => {
      queryClient.setQueryData<Array<Application>>([queryKeys.application.GET_ALL_BY_ROLE], (applications) => {
        if (!applications) {
          return;
        }

        const filteredList: Array<Application> = applications.filter((application: Application) => application.uuid !== response.uuid);

        return [...filteredList, response];
      });

      history.replaceState(response, '', `/applications/edit/${response.uuid}`);
    },
    onError: (error: AxiosError<CoreErrorResponse>) => {
      if (axios.isAxiosError(error)) {
        const status: number | undefined = error.response?.data.errorCode;
        const errors: CoreErrorResponse | undefined = error.response?.data;

        if (status) {
          if (status === 400 && errors) {
            if (errors) {
              errors.errors.forEach((error: ErrorDetail) => {
                if (error.fieldName) {
                  setError(error.fieldName as UpdateApplicationFormErrorT, { message: error.errorMessage });
                }
              });
            }
          } else if (status >= 500) {
            setError('root', { message: errorConstants.UNEXPECTED_SERVER_ERROR });
          }
        }
      } else {
        setError('root', { message: errorConstants.UNEXPECTED_GLOBAL_ERROR });
      }
    },
  });
};

const pageLoadValidationService: PageLoadValidationService = {
  validateInterviewStatus: (
    application: Application,
    updatedData: Application | undefined,
    selectOptions: ApplicationStatusSelectOptions,
  ): boolean => {
    const submittedStatus: ApplicationStatus | undefined = selectOptions.applicationStatus?.filter((element: ApplicationStatus) => {
      return element.name === ApplicationStatusE.SUBMITTED;
    })[0];

    if (submittedStatus) {
      return !(application.applicationStatus.name === submittedStatus.name || updatedData?.applicationStatus.name === submittedStatus.name);
    }

    return false;
  },
  validateOfferStatus: (
    application: Application,
    updatedData: Application | undefined,
    selectOptions: ApplicationStatusSelectOptions,
  ): boolean => {
    if (!application.interviewStatus?.uuid) {
      return true;
    }

    const notInvitedStatus: InterviewStatus | undefined = selectOptions.interviewStatus?.filter((element: ApplicationStatus) => {
      return element.name === InterviewStatusE.NOT_INVITED;
    })[0];

    if (notInvitedStatus) {
      return application.interviewStatus.name === notInvitedStatus.name || updatedData?.interviewStatus?.name === notInvitedStatus.name;
    }

    return false;
  },
  validateResponseStatus: (
    application: Application,
    updatedData: Application | undefined,
    selectOptions: ApplicationStatusSelectOptions,
  ): boolean => {
    if (!application.offerStatus?.uuid) {
      return true;
    }

    const rejectedStatus: OfferStatus | undefined = selectOptions.offerStatus?.filter((element: ApplicationStatus) => {
      return element.name === OfferStatusE.REJECTED;
    })[0];

    if (rejectedStatus) {
      return application.offerStatus.name === rejectedStatus.name || updatedData?.offerStatus?.name === rejectedStatus.name;
    }

    return false;
  },
  validateFinalDestinationStatus: (
    application: Application,
    updatedData: Application | undefined,
    selectOptions: ApplicationStatusSelectOptions,
  ): boolean => {
    if (!application.offerStatus?.uuid) {
      return true;
    }

    const rejectedStatus: OfferStatus | undefined = selectOptions.offerStatus?.filter((element: ApplicationStatus) => {
      return element.name === OfferStatusE.REJECTED;
    })[0];

    if (rejectedStatus) {
      return application.offerStatus.name === rejectedStatus.name || updatedData?.offerStatus?.name === rejectedStatus.name;
    }

    const offerDeclinedStatus: ResponseStatus | undefined = selectOptions.responseStatus?.filter((element: ApplicationStatus) => {
      return element.name === ResponseStatusE.OFFER_DECLINED;
    })[0];

    if (offerDeclinedStatus) {
      return (
        application.responseStatus?.name === offerDeclinedStatus.name || updatedData?.responseStatus?.name === offerDeclinedStatus.name
      );
    }

    return false;
  },
};

/**
 * TODO
 */
type ApplicationStatusUnionArray =
  | Array<ApplicationStatus>
  | Array<InterviewStatus>
  | Array<OfferStatus>
  | Array<ResponseStatus>
  | Array<FinalDestinationStatus>;

/**
 * TODO
 *
 * @param statusList
 * @param statusUuid
 * @returns {boolean}
 */
const isStatusInList = (statusList: ApplicationStatusUnionArray, statusUuid: string): boolean => {
  return statusList.some((element) => element.uuid === statusUuid);
};

/**
 * The custom hook handles the logic connected to the individual field updates, i.e. when and which field should get disabled.
 *
 * @param application The {@link Application} that is going to be updated.
 * @param updatedData The updated data.
 * @param selectOptions Every possible dropdown option.
 * @returns {HandleFieldDisableStatus}
 */
export const useHandleFieldDisableStatus = (
  application: Application,
  updatedData: Application | undefined,
  selectOptions: ApplicationStatusSelectOptions,
): HandleFieldDisableStatus => {
  // By default, all fields' isDisable status is turned off as they are updated by the onPageLoadValidation() method.
  const [fieldsReadOnlyStatus, setFieldsReadOnlyStatus] = useState<FieldsReadOnlyStatus>({
    isApplicationStatusReadOnly: false,
    isInterviewStatusReadOnly: false,
    isOfferStatusReadOnly: false,
    isResponseStatusReadOnly: false,
    isFinalDestinationStatusReadOnly: false,
  });

  const onPageLoadValidation = () => {
    const plannedStatus: ApplicationStatus | undefined = selectOptions.applicationStatus?.filter((element: ApplicationStatus) => {
      return element.name === ApplicationStatusE.PLANNED;
    })[0];
    const withdrawnStatus: ApplicationStatus | undefined = selectOptions.applicationStatus?.filter((element: ApplicationStatus) => {
      return element.name === ApplicationStatusE.WITHDRAWN;
    })[0];

    // If ApplicationStatus is set either to 'Planned' or 'Withdrawn', all fields are disabled.
    if (plannedStatus?.uuid || withdrawnStatus?.uuid) {
      if (
        application.applicationStatus.name === plannedStatus?.name ||
        updatedData?.applicationStatus.name === plannedStatus?.name ||
        application.applicationStatus.name === withdrawnStatus?.name ||
        updatedData?.applicationStatus.name === withdrawnStatus?.name
      ) {
        setFieldsReadOnlyStatus({
          ...fieldsReadOnlyStatus,
          isInterviewStatusReadOnly: true,
          isOfferStatusReadOnly: true,
          isResponseStatusReadOnly: true,
          isFinalDestinationStatusReadOnly: true,
        });
      }
    }

    const submittedStatus: ApplicationStatus | undefined = selectOptions.applicationStatus?.filter((element: ApplicationStatus) => {
      return element.name === ApplicationStatusE.SUBMITTED;
    })[0];

    // If ApplicationStatus is set to 'Submitted', all fields are validated based on their internal validation rules.
    if (submittedStatus?.uuid) {
      if (application.applicationStatus.name === submittedStatus.name || updatedData?.applicationStatus.name === submittedStatus.name) {
        setFieldsReadOnlyStatus({
          isApplicationStatusReadOnly: false,
          isInterviewStatusReadOnly: pageLoadValidationService.validateInterviewStatus(application, updatedData, selectOptions),
          isOfferStatusReadOnly: pageLoadValidationService.validateOfferStatus(application, updatedData, selectOptions),
          isResponseStatusReadOnly: pageLoadValidationService.validateResponseStatus(application, updatedData, selectOptions),
          isFinalDestinationStatusReadOnly: pageLoadValidationService.validateFinalDestinationStatus(
            application,
            updatedData,
            selectOptions,
          ),
        });
      }
    }
  };

  // The method runs when the ApplicationStatus field is updated.
  const updateInterviewStatus = (eventTargetValue: string): void => {
    const plannedStatus: ApplicationStatus | undefined = selectOptions.applicationStatus?.filter((element: ApplicationStatus) => {
      return element.name === ApplicationStatusE.PLANNED;
    })[0];
    const withdrawnStatus: ApplicationStatus | undefined = selectOptions.applicationStatus?.filter((element: ApplicationStatus) => {
      return element.name === ApplicationStatusE.WITHDRAWN;
    })[0];

    // If ApplicationStatus is set either to 'Planned' or 'Withdrawn', the following fields are disabled.
    // If ApplicationStatus is set to 'Submitted', InterviewStatus is activated.
    if ((plannedStatus && eventTargetValue === plannedStatus.uuid) || (withdrawnStatus && eventTargetValue === withdrawnStatus.uuid)) {
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
        isInterviewStatusReadOnly: false,
        isOfferStatusReadOnly: pageLoadValidationService.validateOfferStatus(application, updatedData, selectOptions),
        isResponseStatusReadOnly: pageLoadValidationService.validateResponseStatus(application, updatedData, selectOptions),
        isFinalDestinationStatusReadOnly: pageLoadValidationService.validateFinalDestinationStatus(application, updatedData, selectOptions),
      });
    }
  };

  // The method runs when the InterviewStatus field is updated.
  const updateOfferStatus = (eventTargetValue: string): void => {
    const invitedStatuses: Array<OfferStatus> | undefined = selectOptions.interviewStatus?.filter((element: InterviewStatus) => {
      return element.name !== InterviewStatusE.NOT_INVITED;
    });

    // If InterviewStatus is set to 'Invited' or 'No interview', OfferStatus is activated.
    // If InterviewStatus is set to 'Not invited', the following fields are disabled.
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

  // The method runs when the OfferStatus field is updated.
  const updateResponseStatus = (eventTargetValue: string): void => {
    const positiveResponseStatuses: Array<ResponseStatus> | undefined = selectOptions.offerStatus?.filter((element: OfferStatus) => {
      return element.name !== OfferStatusE.REJECTED;
    });

    // If OfferStatus is set to 'Conditional', 'Deferred' or 'Unconditional', ResponseStatus is activated.
    // If OfferStatus is set to 'Rejected', the following fields are disabled.
    if (positiveResponseStatuses) {
      if (isStatusInList(positiveResponseStatuses, eventTargetValue)) {
        setFieldsReadOnlyStatus({
          ...fieldsReadOnlyStatus,
          isResponseStatusReadOnly: false,
          isFinalDestinationStatusReadOnly: false,
        });
      } else {
        setFieldsReadOnlyStatus({
          ...fieldsReadOnlyStatus,
          isResponseStatusReadOnly: true,
          isFinalDestinationStatusReadOnly: true,
        });
      }
    }
  };

  // The method runs when the ResponseStatus field is updated.
  const updateFinalDestinationStatus = (eventTargetValue: string): void => {
    const offerDeclinedStatus: ResponseStatus | undefined = selectOptions.responseStatus?.filter((element: ResponseStatus) => {
      return element.name === ResponseStatusE.OFFER_DECLINED;
    })[0];

    // If OfferStatus is set to 'Offer Declined', the following fields are disabled.
    if (offerDeclinedStatus && eventTargetValue === offerDeclinedStatus.uuid) {
      setFieldsReadOnlyStatus({
        ...fieldsReadOnlyStatus,
        isFinalDestinationStatusReadOnly: true,
      });
    }
  };

  return {
    onPageLoadValidation,
    fieldsReadOnlyStatus,
    updateInterviewStatus,
    updateOfferStatus,
    updateResponseStatus,
    updateFinalDestinationStatus,
  };
};
