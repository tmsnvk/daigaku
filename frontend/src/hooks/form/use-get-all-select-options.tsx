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
} from '@daigaku/services';

/* configuration, utilities, constants imports */
import { queryKeys } from '@daigaku/configuration';

/* interface, type, enum imports */
import { ApplicationOptions } from '@daigaku/common-types';

/**
 * Fetches all status records for various application forms.
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
