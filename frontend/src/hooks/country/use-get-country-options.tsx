/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* external imports */
import { useQuery } from '@tanstack/react-query';

/* logic imports */
import { countryService } from '@services/index';

/* configuration, utilities, constants imports */
import { queryKeys } from '@configuration';

/* interface, type, enum imports */
import { CountryOption, ListQueryResult } from '@common-types';

/**
 * Fetches a list of {@link CountryOption} objects.
 *
 * @return {ListQueryResult<CountryOption>}
 *
 * @since 0.0.1
 */
export const useGetCountryOptions = (): ListQueryResult<CountryOption> => {
  return useQuery({
    queryKey: [queryKeys.COUNTRY.GET_AS_SELECT_OPTIONS],
    queryFn: () => countryService.getAllOptions(),
  });
};
