import { useQuery } from '@tanstack/react-query';

import { institutionService } from '@services/index.ts';

import { queryKeys } from '@configuration';

const useGetInstitutionOptions = () => {
  return useQuery({
    queryKey: [queryKeys.INSTITUTIONS.GET_AS_SELECT_OPTIONS],
    queryFn: () => institutionService.getAllSelectOptions(),
  });
};

export default useGetInstitutionOptions;
