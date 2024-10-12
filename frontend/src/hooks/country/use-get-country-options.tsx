/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 */

/* external imports */
import { useQuery } from '@tanstack/react-query';

/* logic imports */
import { countryService } from '@services/index';

/* configuration, utilities, constants imports */
import { queryKeys } from '@configuration';

/* interface, type, enum imports */
import { ListQueryResult } from '@common-types';
import { CountryOption } from '@services/support/country.service';

/**
 * The custom hook fetches a list of {@link CountryOption} objects.
 *
 * @returns {ListQueryResult<CountryOption>}
 *
 * @since 0.0.1
 */
export const useGetCountryOptions = (): ListQueryResult<CountryOption> => {
  return useQuery({
    queryKey: [queryKeys.COUNTRY.GET_AS_SELECT_OPTIONS],
    queryFn: () => countryService.getAllDropdownOptions(),
  });
};
