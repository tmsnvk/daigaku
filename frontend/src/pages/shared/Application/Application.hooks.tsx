import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@configuration';
import { applicationService } from '@services/index.ts';
import { ApplicationT } from '@custom-types/ApplicationT.ts';

const useGetApplication = (state: ApplicationT | null, applicationId: string) => {
  return useQuery({
    queryKey: [queryKeys.APPLICATION.GET_BY_ID],
    queryFn: () => applicationService.getByUuid(applicationId),
    enabled: state === null,
  });
};

export {
  useGetApplication,
};
