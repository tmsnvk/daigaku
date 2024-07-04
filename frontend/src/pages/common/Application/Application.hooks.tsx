import { useQuery } from '@tanstack/react-query';

import { applicationService } from '@services/index.ts';

import { queryKeys } from '@configuration';

import { ApplicationT } from '@services/application/application.service.ts';

const useGetApplication = (state: ApplicationT | null, applicationUuid: string) => {
  return useQuery({
    queryKey: [queryKeys.APPLICATION.GET_BY_UUID],
    queryFn: () => applicationService.getByUuid(applicationUuid),
    enabled: state === null,
  });
};

export {
  useGetApplication,
};
