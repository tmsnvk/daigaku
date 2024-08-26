/**
 * @prettier
 */

import { useQuery } from '@tanstack/react-query';

import { institutionService } from '@services/index.ts';

import { queryKeys } from '@configuration';

import { InstitutionOption } from '@services/support/institution.service';
import { ListQueryResult } from '@common-types';

export const useGetInstitutionOptions = (): ListQueryResult<InstitutionOption> => {
  return useQuery({
    queryKey: [queryKeys.INSTITUTIONS.GET_AS_SELECT_OPTIONS],
    queryFn: () => institutionService.getAllDropdownOptions(),
  });
};
