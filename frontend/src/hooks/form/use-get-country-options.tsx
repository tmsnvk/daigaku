/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseQueryResult, useQuery } from '@tanstack/react-query';

/* logic imports */
import { ServerError, UnauthorizedError, UnexpectedError } from '@daigaku/errors';
import { countryService } from '@daigaku/services';

/* configuration, utilities, constants imports */
import { queryKeys } from '@daigaku/constants';

/* interface, type, enum, schema imports */
import { CountryOption } from '@daigaku/common-types';

/**
 * Fetches a list of {@link CountryOption} objects.
 *
 * @return {UseQueryResult<Array<CountryOption>, UnauthorizedError | ServerError | UnexpectedError>}
 */
export const useGetCountryOptions = (): UseQueryResult<
  Array<CountryOption>,
  UnauthorizedError | ServerError | UnexpectedError
> => {
  return useQuery({
    queryKey: [queryKeys.country.GET_AS_SELECT_OPTIONS],
    queryFn: () => countryService.getAllOptions(),
  });
};
