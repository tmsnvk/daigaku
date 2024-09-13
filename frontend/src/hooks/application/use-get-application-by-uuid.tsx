/**
 * @prettier
 */

/* external imports */
import { useQuery } from '@tanstack/react-query';

/* service imports */
import { applicationService } from '@services/index';

/* configuration imports */
import { queryKeys } from '@configuration';

/* interface, type, enum imports */
import { Application, SimpleQueryResult } from '@common-types';

/*
 * custom hook - TODO - add functionality description
 */
export const useGetApplicationByUuid = (state: Application | null, applicationUuid: string): SimpleQueryResult<Application> => {
  return useQuery({
    queryKey: [queryKeys.application.GET_BY_UUID],
    queryFn: () => applicationService.getByUuid(applicationUuid),
    enabled: state === null,
  });
};
