/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseQueryResult, useQuery } from '@tanstack/react-query';

/* logic imports */
import { CoreApiError } from '@daigaku/errors';
import { countryService } from '@daigaku/services';

/* configuration, constants imports */
import { queryKeys } from '@daigaku/constants';

/* interface, type imports */
import { CountryOption } from '@daigaku/common-types';

/**
 * Fetches a list of {@link CountryOption} objects.
 *
 * @return {UseQueryResult<Array<CountryOption>, CoreApiError>}
 */
export const useGetCountryOptions = (): UseQueryResult<Array<CountryOption>, CoreApiError> => {
  return useQuery({
    queryKey: [queryKeys.country.GET_AS_SELECT_OPTIONS],
    queryFn: () => countryService.findOptionList(),
  });
};
