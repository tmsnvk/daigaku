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
import { InstitutionOptionResponse } from '@daigaku/common-types';

/**
 * Fetches a list of {@link InstitutionOptionResponse} objects.
 *
 * @return {UseQueryResult<Array<InstitutionOptionResponse>, CoreApiError>}
 */
export const useGetInstitutionOptions = (): UseQueryResult<Array<InstitutionOptionResponse>, CoreApiError> => {
  return useQuery({
    queryKey: [queryKeys.institutions.GET_AS_SELECT_OPTIONS],
    queryFn: () => institutionService.findOptionList(),
  });
};
