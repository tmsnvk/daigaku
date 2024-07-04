import { useQuery } from '@tanstack/react-query';

import { universityService } from '@services/index.ts';

import { queryKeys } from '@configuration';

const useGetUniversityOptionsByCountryUuid = (isCountryFieldSelected: boolean, selectedCountryUuid: string) => {
  return useQuery({
    queryKey: [queryKeys.UNIVERSITY.GET_AS_SELECT_OPTIONS, selectedCountryUuid],
    queryFn: () => universityService.getOptionsByCountryUuid(selectedCountryUuid),
    enabled: isCountryFieldSelected,
  });
};

export default useGetUniversityOptionsByCountryUuid;
