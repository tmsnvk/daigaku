/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { useQuery } from '@tanstack/react-query';

/* logic imports */
import { institutionService } from '@services';

/* configuration, utilities, constants imports */
import { queryKeys } from '@configuration';

/* interface, type, enum imports */
import { InstitutionOption, ListQueryResult } from '@common-types';

/**
 * Fetches a list of {@link InstitutionOption} objects.
 *
 * @return {ListQueryResult<InstitutionOption>}
 */
export const useGetInstitutionOptions = (): ListQueryResult<InstitutionOption> => {
  return useQuery({
    queryKey: [queryKeys.INSTITUTIONS.GET_AS_SELECT_OPTIONS],
    queryFn: () => institutionService.getAllOptions(),
  });
};
