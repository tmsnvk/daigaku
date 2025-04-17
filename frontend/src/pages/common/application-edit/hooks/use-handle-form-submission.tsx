/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseFormSetError } from 'react-hook-form';

/* configuration, utilities, constants imports */
import { queryClient, queryKeys } from '@daigaku/configuration';
import { localization as l } from '@daigaku/constants';

/* interface, type, enum imports */
import {
  Application,
  ApplicationStatusUnion,
  FinalDestinationStatus,
  FinalDestinationStatusE,
  ResponseStatus,
  ResponseStatusE,
  UpdateApplicationByStudent,
} from '@daigaku/common-types';

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
 * Defines the return value properties of the {@link useHandleFormSubmission}, {@link useUpdateApplication} custom
 * hooks.
 */
export interface HandleFormSubmission {
  submitForm: (
    formData: UpdateApplicationByStudent,
    applicationUuid: string,
    mutate: (formData: UpdateApplicationByStudent) => void,
    setError: UseFormSetError<UpdateApplicationByStudent>,
  ) => void;
}

/**
 * Manages the form submission's first step.
 * It checks if the user already has an {@link Application} set to either {@link ResponseStatusE.FIRM_CHOICE},
 * {@link FinalDestinationStatusE.FINAL_DESTINATION} or {@link FinalDestinationStatusE.DEFERRED_ENTRY}.
 * If yes, an error message stops the submission. If no error was found, the submitForm() method calls the
 * `react-query` mutate() method.
 *
 * @return {HandleFormSubmission}
 */
export const useHandleFormSubmission = (): HandleFormSubmission => {
  const handleValidation = (formData: UpdateApplicationByStudent, currentApplicationUuid: string): Array<string> => {
    const errors: Array<string> = [];

    // Find application, response, and final destination status react-query caches.
    const applicationsCache: Array<Application> | undefined = findQueryCache<Application>(
      queryKeys.application.GET_ALL_BY_ROLE,
    );
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
    const finalDestinationUuid: string = filterCacheByUuid(
      finalDestinationStatusCache,
      FinalDestinationStatusE.FINAL_DESTINATION,
    );
    const finalDestinationDeferredUuid: string = filterCacheByUuid(
      finalDestinationStatusCache,
      FinalDestinationStatusE.DEFERRED_ENTRY,
    );

    // Check each application (except for the current) if they have any of the three status set.
    // If yes, error messages are thrown to the UI and the submission is stopped before hitting the API call.
    applicationsCache.forEach((application: Application) => {
      if (application.uuid !== currentApplicationUuid) {
        if (
          application.responseStatus?.name === ResponseStatusE.FIRM_CHOICE &&
          formData.responseStatusUuid === firmChoiceUuid
        ) {
          errors.push(l.PAGES.COMMON.APPLICATION_EDIT.NOTIFICATIONS.ERRORS.FIRM_CHOICE_SELECTION);
        }

        if (
          (application.finalDestinationStatus?.name === FinalDestinationStatusE.FINAL_DESTINATION &&
            formData.finalDestinationStatusUuid === finalDestinationUuid) ||
          (application.finalDestinationStatus?.name === FinalDestinationStatusE.DEFERRED_ENTRY &&
            formData.finalDestinationStatusUuid === finalDestinationDeferredUuid)
        ) {
          errors.push(l.PAGES.COMMON.APPLICATION_EDIT.NOTIFICATIONS.ERRORS.FINAL_DESTINATION_SELECTION);
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
