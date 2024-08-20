import {
  UseQueryResult,
  useQuery,
} from '@tanstack/react-query';

import { universityService } from '@services/index.ts';

import { queryKeys } from '@configuration';

import { UniversityOption } from '@services/support/university.service';

interface UniversityOptionsByCountryUuidHookParams {
  isCountryFieldSelected: boolean;
  selectedCountryUuid: string;
}

export type UniversityOptionsByCountryUuid = UseQueryResult<Array<UniversityOption>, Error>;

const useGetUniversityOptionsByCountryUuid = ({
  isCountryFieldSelected,
  selectedCountryUuid,
}: UniversityOptionsByCountryUuidHookParams): UniversityOptionsByCountryUuid => {
  return useQuery({
    queryKey: [queryKeys.UNIVERSITY.GET_AS_SELECT_OPTIONS, selectedCountryUuid],
    queryFn: () => universityService.getDropdownOptionsByCountryUuid(selectedCountryUuid),
    enabled: isCountryFieldSelected,
  });
};

export default useGetUniversityOptionsByCountryUuid;
