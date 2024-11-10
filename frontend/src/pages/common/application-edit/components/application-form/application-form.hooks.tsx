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
import { UseFormSetError } from 'react-hook-form';

/* logic imports */
import { applicationStudentService } from '@services/index';

/* configuration, utilities, constants imports */
import { mutationKeys, queryClient, queryKeys } from '@configuration';
import { constants } from './application-form.constants';

/* interface, type, enum imports */
import {
  Application,
  DefaultErrorResponse,
  ErrorDetail,
  FinalDestinationStatus,
  FinalDestinationStatusE,
  MutationResult,
  ResponseStatus,
  ResponseStatusE,
} from '@common-types';
import { UNEXPECTED_GLOBAL_ERROR, UNEXPECTED_SERVER_ERROR } from '@constants';

/**
 * ===============
 * Shared Interfaces, Types, Enums
 * ===============
 */

/**
 * Defines the properties of the form data fields.
 *
 * @since 0.0.1
 */
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

/**
 * Defines the properties of `react-query` cache objects.
 *
 * @since 0.0.1
 */
interface CachedData {
  name: string;
  uuid: string;
}

/**
 * The helper method used by {@link useHandleFormSubmission} filters various local `react-query` cache lists
 * by the provided option name and returns the uuid of the first matching entry.
 *
 * @param cache The array of cached data to filter.
 * @param optionName The name of the option to match in the cached data.
 *
 * @returns {string} The uuid of the first cached data entry that matches the provided option name.
 *
 * @since 0.0.1
 */
const filterCacheByUuid = <T extends CachedData>(cache: Array<T>, optionName: string): string => {
  const filteredOption: T = cache?.filter((option: T) => option.name === optionName)[0];

  return filteredOption.uuid;
};

/**
 * The helper method finds the provided local `react-query` cache type.
 *
 * @template T The `react-query` cache type.
 * @param querykey The cache's query key identifier.
 *
 * @returns {Array<T> | undefined}
 */
const findQueryCache = <T extends {}>(queryKey: string): Array<T> | undefined => {
  return queryClient.getQueryData<Array<T>>([queryKey]);
};

/**
 * ===============
 * Custom Hook {@link useHandleFormSubmission}
 * ===============
 */

/**
 * Defines the return value properties of the {@link useHandleFormSubmission}, {@link useUpdateApplication} custom hooks.
 *
 * @since 0.0.1
 */
export interface HandleFormSubmission {
  submitForm: (
    formData: UpdateApplicationFormFields,
    applicationUuid: string,
    mutate: (formData: UpdateApplicationFormFields) => void,
    setError: UseFormSetError<UpdateApplicationFormFields>,
  ) => void;
}

/**
 * Manages the form submission's first step. It checks if the user already has an {@link Application} set to either {@link ResponseStatusE.FIRM_CHOICE},
 * {@link FinalDestinationStatusE.FINAL_DESTINATION} or {@link FinalDestinationStatusE.DEFERRED_ENTRY}. If yes, an error message stops the submission.
 * If no error was found, the `react-query` mutate() method is called.
 *
 * @return {HandleFormSubmission}
 *
 * @since 0.0.1
 */
export const useHandleFormSubmission = (): HandleFormSubmission => {
  const handleValidation = (formData: UpdateApplicationFormFields, currentApplicationUuid: string): Array<string> => {
    const errors: Array<string> = [];

    // Find application, response status and final destination status react-query caches.
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

    // Find the three specific status uuids.
    const firmChoiceUuid: string = filterCacheByUuid(responseStatusCache, ResponseStatusE.FIRM_CHOICE);
    const finalDestinationUuid: string = filterCacheByUuid(finalDestinationStatusCache, FinalDestinationStatusE.FINAL_DESTINATION);
    const finalDestinationDeferredUuid: string = filterCacheByUuid(finalDestinationStatusCache, FinalDestinationStatusE.DEFERRED_ENTRY);

    // Check each application (except for the current) if they have any of the three status set.
    // If yes, error messages are thrown to the ui and the submission is stopped before hitting the API call.
    applicationsCache.forEach((application: Application) => {
      if (application.uuid !== currentApplicationUuid) {
        if (application.responseStatus.name === ResponseStatusE.FIRM_CHOICE && formData.responseStatusUuid === firmChoiceUuid) {
          errors.push(constants.notifications.errors.FIRM_CHOICE_SELECTION);
        }

        if (
          (application.finalDestinationStatus.name === FinalDestinationStatusE.FINAL_DESTINATION &&
            formData.finalDestinationStatusUuid === finalDestinationUuid) ||
          (application.finalDestinationStatus.name === FinalDestinationStatusE.DEFERRED_ENTRY &&
            formData.finalDestinationStatusUuid === finalDestinationDeferredUuid)
        ) {
          errors.push(constants.notifications.errors.FINAL_DESTINATION_SELECTION);
        }
      }
    });

    return errors;
  };

  const submitForm = (
    formData: UpdateApplicationFormFields,
    currentApplicationUuid: string,
    mutate: (formData: UpdateApplicationFormFields) => void,
    setError: UseFormSetError<UpdateApplicationFormFields>,
  ): void => {
    const validationErrors: Array<string> = handleValidation(formData, currentApplicationUuid);

    if (!validationErrors.length) {
      const fieldKeys = Object.keys(formData) as Array<keyof UpdateApplicationFormFields>;

      /**
       * Disabled inputs are returned as undefined. These undefined inputs are replaced with an empty string,
       *so the backend uuid validation would not fail.
       */
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

/**
 * Defines the possible error field names in the {@link useUpdateApplication} custom hook.
 *
 * @since 0.0.1
 */
type UpdateApplicationFormErrorT =
  | 'root'
  | 'applicationStatusUuid'
  | 'interviewStatusUuid'
  | 'offerStatusUuid'
  | 'responseStatusUuid'
  | 'finalDestinationStatusUuid';

/**
 * Defines the return value properties of the {@link useUpdateApplication} custom hook.
 *
 * @since 0.0.1
 */
export type UpdateApplicationForm = MutationResult<Application, AxiosError<DefaultErrorResponse>, UpdateApplicationFormFields>;

/**
 * Manages the {@link ApplicationForm} submission process, including REST API request, error handling,
 * and post-success actions, such as setting account context and authentication status.
 *
 * @param setError `react-hook-form`'s error setting method.
 * @param applicationUuid The application's uuid.
 * @return {UpdateApplicationForm}
 *
 * @since 0.0.1
 */
export const useUpdateApplication = (
  setError: UseFormSetError<UpdateApplicationFormFields>,
  applicationUuid: string,
): UpdateApplicationForm => {
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
    onError: (error: AxiosError<DefaultErrorResponse>) => {
      if (axios.isAxiosError(error)) {
        const status: number | undefined = error.response?.data.errorCode;
        const errors: DefaultErrorResponse | undefined = error.response?.data;

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
            setError('root', { message: UNEXPECTED_SERVER_ERROR });
          }
        }
      } else {
        setError('root', { message: UNEXPECTED_GLOBAL_ERROR });
      }
    },
  });
};
