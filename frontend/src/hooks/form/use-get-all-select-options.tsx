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
import { queryKeys } from '@daigaku/constants';

/* interface, type, enum, schema imports */
import { ApplicationRecordStatusOptionsResponse } from '@daigaku/common-types';

/**
 * Fetches all status records for various application forms.
 *
 * @return {ApplicationRecordStatusOptionsResponse}
 */
export const useGetAllSelectOptions = (): ApplicationRecordStatusOptionsResponse => {
  return useQueries({
    queries: [
      {
        queryKey: [queryKeys.applicationStatus.GET_AS_SELECT_OPTIONS],
        queryFn: () => applicationStatusService.getAll(),
      },
      {
        queryKey: [queryKeys.interviewStatus.GET_AS_SELECT_OPTIONS],
        queryFn: () => interviewStatusService.getAll(),
      },
      {
        queryKey: [queryKeys.offerStatus.GET_AS_SELECT_OPTIONS],
        queryFn: () => offerStatusService.getAll(),
      },
      {
        queryKey: [queryKeys.responseStatus.GET_AS_SELECT_OPTIONS],
        queryFn: () => responseStatusService.getAll(),
      },
      {
        queryKey: [queryKeys.finalDestinationStatus.GET_AS_SELECT_OPTIONS],
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
        refetch: {
          applicationStatus: result[0].refetch,
          interviewStatus: result[1].refetch,
          offerStatus: result[2].refetch,
          responseStatus: result[3].refetch,
          finalDestinationStatus: result[4].refetch,
        },
      };
    },
  });
};
