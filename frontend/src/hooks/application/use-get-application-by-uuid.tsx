/**
 * @prettier
 */

import { useQuery } from '@tanstack/react-query';

import { applicationService } from '@services/index';

import { queryKeys } from '@configuration';

import { Application, SimpleQueryResult } from '@common-types';

export const useGetApplicationByUuid = (state: Application | null, applicationUuid: string): SimpleQueryResult<Application> => {
  return useQuery({
    queryKey: [queryKeys.APPLICATION.GET_BY_UUID],
    queryFn: () => applicationService.getByUuid(applicationUuid),
    enabled: state === null,
  });
};
