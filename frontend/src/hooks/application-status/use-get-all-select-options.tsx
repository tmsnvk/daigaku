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
import { ApplicationStatus } from '@services/status/application-status.service';
import { FinalDestinationStatus } from '@services/status/final-destination-status.service';
import { InterviewStatus } from '@services/status/interview-status-service.service';
import { OfferStatus } from '@services/status/offer-status.service';
import { ResponseStatus } from '@services/status/response-status.service';

/**
 * Defines the properties of all {@link Application} status fields.
 *
 * @since 0.0.1
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
 *
 * @since 0.0.1
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
 *
 * @since 0.0.1
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
