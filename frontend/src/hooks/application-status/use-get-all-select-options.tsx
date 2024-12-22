/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { useQueries } from '@tanstack/react-query';

/* logic imports */
import {
  applicationStatusService,
  finalDestinationStatusService,
  interviewStatusService,
  offerStatusService,
  responseStatusService,
} from '@services/index';

/* configuration, utilities, constants imports */
import { queryKeys } from '@configuration';

/* interface, type, enum imports */
import { ApplicationStatus, FinalDestinationStatus, InterviewStatus, OfferStatus, ResponseStatus } from '@common-types';

/**
 * Defines the properties of all {@link Application} status fields.
 */
export interface ApplicationStatusOption {
  /**
   * All {@link ApplicationStatus} objects.
   */
  applicationStatus: Array<ApplicationStatus> | undefined;

  /**
   * All {@link InterviewStatus} objects.
   */
  interviewStatus: Array<InterviewStatus> | undefined;

  /**
   * All {@link OfferStatus} objects.
   */
  offerStatus: Array<OfferStatus> | undefined;

  /**
   * All {@link ResponseStatus} objects.
   */
  responseStatus: Array<ResponseStatus> | undefined;

  /**
   * All {@link FinalDestinationStatus} objects.
   */
  finalDestinationStatus: Array<FinalDestinationStatus> | undefined;
}

/**
 * Defines the return properties of the {@link useGetAllSelectOptions} custom hook.
 */
export interface ApplicationOptions {
  /**
   * An object containing all select options for the application statuses.
   */
  selectOptions: ApplicationStatusOption;

  /**
   * Indicates whether the queries are currently loading.
   */
  isLoading: boolean;

  /**
   * Indicates whether an error occurred during the queries.
   */
  isError: boolean;
}

/**
 * Fetches all status objects for the application form.
 *
 * @return {ApplicationOptions}
 */
export const useGetAllSelectOptions = (): ApplicationOptions => {
  return useQueries({
    queries: [
      {
        queryKey: [queryKeys.APPLICATION_STATUS.GET_AS_SELECT_OPTIONS],
        queryFn: () => applicationStatusService.getAll(),
      },
      {
        queryKey: [queryKeys.INTERVIEW_STATUS.GET_AS_SELECT_OPTIONS],
        queryFn: () => interviewStatusService.getAll(),
      },
      {
        queryKey: [queryKeys.OFFER_STATUS.GET_AS_SELECT_OPTIONS],
        queryFn: () => offerStatusService.getAll(),
      },
      {
        queryKey: [queryKeys.RESPONSE_STATUS.GET_AS_SELECT_OPTIONS],
        queryFn: () => responseStatusService.getAll(),
      },
      {
        queryKey: [queryKeys.FINAL_DESTINATION.GET_AS_SELECT_OPTIONS],
        queryFn: () => finalDestinationStatusService.getAll(),
      },
    ],
    combine: (result) => {
      return {
        selectOptions: {
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
