/**
 * @prettier
 */

import { useQuery } from '@tanstack/react-query';

import { universityService } from '@services/index.ts';

import { queryKeys } from '@configuration';

import { UniversityOption } from '@services/support/university.service';
import { ListQueryResult } from '@common-types';

export const useGetUniversityOptionsByCountryUuid = (isCountryFieldSelected: boolean, selectedCountryUuid: string): ListQueryResult<UniversityOption> => {
  return useQuery({
    queryKey: [queryKeys.UNIVERSITY.GET_AS_SELECT_OPTIONS, selectedCountryUuid],
    queryFn: () => universityService.getDropdownOptionsByCountryUuid(selectedCountryUuid),
    enabled: isCountryFieldSelected,
  });
};
