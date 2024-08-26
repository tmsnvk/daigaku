/**
 * @prettier
 */

import { useQueries } from '@tanstack/react-query';

import {
  applicationStatusService,
  finalDestinationStatusService,
  interviewStatusService,
  offerStatusService,
  responseStatusService,
} from '@services/index';

import { queryKeys } from '@configuration';

import { ApplicationStatus } from '@services/status/application-status.service';
import { InterviewStatus } from '@services/status/interview-status-service.service';
import { OfferStatus } from '@services/status/offer-status.service';
import { ResponseStatus } from '@services/status/response-status.service';
import { FinalDestinationStatus } from '@services/status/final-destination-status.service';

export interface ApplicationStatusOption {
  applicationStatus: Array<ApplicationStatus> | undefined;
  interviewStatus: Array<InterviewStatus> | undefined;
  offerStatus: Array<OfferStatus> | undefined;
  responseStatus: Array<ResponseStatus> | undefined;
  finalDestinationStatus: Array<FinalDestinationStatus> | undefined;
}

export interface ApplicationOptions {
  selectOptions: ApplicationStatusOption;
  isLoading: boolean;
  isError: boolean;
}

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
