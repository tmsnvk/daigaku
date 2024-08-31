/**
 * @prettier
 */

/* external imports */
import { useQuery } from '@tanstack/react-query';

/* service imports */
import { universityService } from '@services/index.ts';

/* configuration imports */
import { queryKeys } from '@configuration';

/* interface, type, enum imports */
import { UniversityOption } from '@services/support/university.service';
import { ListQueryResult } from '@common-types';

/*
 * custom hook - TODO - add functionality description
 */
export const useGetUniversityOptionsByCountryUuid = (
  isCountryFieldSelected: boolean,
  selectedCountryUuid: string,
): ListQueryResult<UniversityOption> => {
  return useQuery({
    queryKey: [queryKeys.UNIVERSITY.GET_AS_SELECT_OPTIONS, selectedCountryUuid],
    queryFn: () => universityService.getDropdownOptionsByCountryUuid(selectedCountryUuid),
    enabled: isCountryFieldSelected,
  });
};
