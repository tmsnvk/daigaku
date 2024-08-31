/**
 * @prettier
 */

/* external imports */
import { useQuery } from '@tanstack/react-query';

/* service imports */
import { institutionService } from '@services/index.ts';

/* configuration imports */
import { queryKeys } from '@configuration';

/* interface, type, enum imports */
import { InstitutionOption } from '@services/support/institution.service';
import { ListQueryResult } from '@common-types';

/*
* custom hook - TODO - add functionality description
*/
export const useGetInstitutionOptions = (): ListQueryResult<InstitutionOption> => {
  return useQuery({
    queryKey: [queryKeys.INSTITUTIONS.GET_AS_SELECT_OPTIONS],
    queryFn: () => institutionService.getAllDropdownOptions(),
  });
};
