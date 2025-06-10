/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseQueryResult, useQuery } from '@tanstack/react-query';

/* logic imports */
import { ServerError, UnexpectedError } from '@daigaku/errors';
import { institutionService } from '@daigaku/services';

/* configuration, utilities, constants imports */
import { queryKeys } from '@daigaku/constants';

/* interface, type imports */
import { InstitutionOption } from '@daigaku/common-types';

/**
 * Fetches a list of {@link InstitutionOption} objects.
 *
 * @return {UseQueryResult<Array<InstitutionOption>, ServerError | UnexpectedError>}
 */
export const useGetInstitutionOptions = (): UseQueryResult<Array<InstitutionOption>, ServerError | UnexpectedError> => {
  return useQuery({
    queryKey: [queryKeys.institutions.GET_AS_SELECT_OPTIONS],
    queryFn: () => institutionService.findOptionList(),
  });
};
