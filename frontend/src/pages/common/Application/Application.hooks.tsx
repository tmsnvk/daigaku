import { useQuery } from '@tanstack/react-query';

import { applicationService } from '@services/index';

import { queryKeys } from '@configuration';

import { ApplicationData } from '@services/application/application.service';

const useGetApplication = (state: ApplicationData | null, applicationUuid: string) => {
  return useQuery({
    queryKey: [queryKeys.APPLICATION.GET_BY_UUID],
    queryFn: () => applicationService.getByUuid(applicationUuid),
    enabled: state === null,
  });
};

export {
  useGetApplication,
};
