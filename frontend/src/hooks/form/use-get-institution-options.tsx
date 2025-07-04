/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseQueryResult, useQuery } from '@tanstack/react-query';

/* logic imports */
import { CoreApiError } from '@daigaku/errors';
import { institutionService } from '@daigaku/services';

/* configuration, constants imports */
import { queryKeys } from '@daigaku/constants';

/* interface, type imports */
import { InstitutionOption } from '@daigaku/common-types';

/**
 * Fetches a list of {@link InstitutionOption} objects.
 *
 * @return {UseQueryResult<Array<InstitutionOption>, CoreApiError>}
 */
export const useGetInstitutionOptions = (): UseQueryResult<Array<InstitutionOption>, CoreApiError> => {
  return useQuery({
    queryKey: [queryKeys.institutions.GET_AS_SELECT_OPTIONS],
    queryFn: () => institutionService.findOptionList(),
  });
};
