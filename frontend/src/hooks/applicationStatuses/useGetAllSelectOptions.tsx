import { useQueries } from '@tanstack/react-query';

import {
  applicationStatusService,
  finalDestinationStatusService,
  interviewStatusService,
  offerStatusService,
  responseStatusService,
} from '@services/index.ts';

import { queryKeys } from '@configuration';

import { ApplicationStatusT } from '@services/status/applicationStatus.service.ts';
import { InterviewStatusT } from '@services/status/interviewStatusService.service.ts';
import { OfferStatusT } from '@services/status/offerStatus.service.ts';
import { ResponseStatusT } from '@services/status/responseStatus.service.ts';
import { FinalDestinationStatusT } from '@services/status/finalDestinationStatus.service.ts';

export type ApplicationOptionStatusesT = {
  applicationStatus: ApplicationStatusT[] | undefined;
  interviewStatus: InterviewStatusT[] | undefined;
  offerStatus: OfferStatusT[] | undefined;
  responseStatus: ResponseStatusT[] | undefined;
  finalDestinationStatus: FinalDestinationStatusT[] | undefined;
}

type ApplicationOptionsDataT = {
  selectOptions: ApplicationOptionStatusesT;
  isLoading: boolean;
  isError: boolean;
}

const useGetAllSelectOptions = (): ApplicationOptionsDataT => {
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

export {
  useGetAllSelectOptions,
};
