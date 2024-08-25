/**
 * @prettier
 */

import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { applicationService } from '@services/index';

import { queryKeys } from '@configuration';

import { Application } from '@custom-types/index';

export type GetApplication = UseQueryResult<Application, Error>;

export const useGetApplication = (state: Application | null, applicationUuid: string): GetApplication => {
  return useQuery({
    queryKey: [queryKeys.APPLICATION.GET_BY_UUID],
    queryFn: () => applicationService.getByUuid(applicationUuid),
    enabled: state === null,
  });
};
