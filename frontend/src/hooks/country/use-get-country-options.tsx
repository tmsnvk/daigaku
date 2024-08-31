/**
 * @prettier
 */

/* external imports */
import { useQuery } from '@tanstack/react-query';

/* service imports */
import { countryService } from '@services/index';

/* configuration imports */
import { queryKeys } from '@configuration';

/* interface, type, enum imports */
import { CountryOption } from '@services/support/country.service';
import { ListQueryResult } from '@common-types';

/*
 * custom hook - TODO - add functionality description
 */
export const useGetCountryOptions = (): ListQueryResult<CountryOption> => {
  return useQuery({
    queryKey: [queryKeys.COUNTRY.GET_AS_SELECT_OPTIONS],
    queryFn: () => countryService.getAllDropdownOptions(),
  });
};
