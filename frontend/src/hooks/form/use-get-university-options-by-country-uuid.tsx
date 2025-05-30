/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseQueryResult, useQuery } from '@tanstack/react-query';

/* logic imports */
import { ServerError, UnauthorizedError, UnexpectedError } from '@daigaku/errors';
import { universityService } from '@daigaku/services';

/* configuration, utilities, constants imports */
import { queryKeys } from '@daigaku/configuration';

/* interface, type, enum, schema imports */
import { UniversityOption } from '@daigaku/common-types';

/**
 * Fetches a list of {@link UniversityOption} objects.
 * The request to the server is initiated only when a country is chosen in the given form.
 *
 * @param selectedCountryUuid The selected country's uuid string.
 * @return {UseQueryResult<Array<UniversityOption>, UnauthorizedError | ServerError | UnexpectedError>}
 */
export const useGetUniversityOptionsByCountryUuid = (
  selectedCountryUuid: string,
): UseQueryResult<Array<UniversityOption>, UnauthorizedError | ServerError | UnexpectedError> => {
  return useQuery({
    queryKey: [queryKeys.university.GET_AS_SELECT_OPTIONS, selectedCountryUuid],
    queryFn: () => universityService.getAllOptionsByCountryUuid(selectedCountryUuid),
    enabled: !!selectedCountryUuid,
  });
};
