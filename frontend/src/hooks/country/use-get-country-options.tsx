/**
 * @prettier
 */

import { useQuery } from '@tanstack/react-query';

import { countryService } from '@services/index';

import { queryKeys } from '@configuration';

import { CountryOption } from '@services/support/country.service';
import { ListQueryResult } from '@common-types';

export const useGetCountryOptions = (): ListQueryResult<CountryOption> => {
  return useQuery({
    queryKey: [queryKeys.COUNTRY.GET_AS_SELECT_OPTIONS],
    queryFn: () => countryService.getAllDropdownOptions(),
  });
};
