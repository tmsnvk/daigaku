import {
  UseQueryResult,
  useQuery,
} from '@tanstack/react-query';

import { institutionService } from '@services/index.ts';

import { queryKeys } from '@configuration';

import { InstitutionOption } from '@services/support/institution.service';

export type InstitutionOptions = UseQueryResult<Array<InstitutionOption>, Error>;

const useGetInstitutionOptions = (): InstitutionOptions => {
  return useQuery({
    queryKey: [queryKeys.INSTITUTIONS.GET_AS_SELECT_OPTIONS],
    queryFn: () => institutionService.getAllSelectOptions(),
  });
};

export default useGetInstitutionOptions;
