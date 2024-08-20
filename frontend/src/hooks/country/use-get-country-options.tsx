import {
  UseQueryResult,
  useQuery,
} from '@tanstack/react-query';

import { countryService } from '@services/index';

import { queryKeys } from '@configuration';

import { CountryOption } from '@services/support/country.service';

export type CountryOptions = UseQueryResult<Array<CountryOption>, Error>;

const useGetCountryOptions = (): CountryOptions => {
  return useQuery({
    queryKey: [queryKeys.COUNTRY.GET_AS_SELECT_OPTIONS],
    queryFn: () => countryService.getAllDropdownOptions(),
  });
};

export default useGetCountryOptions;
