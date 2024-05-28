import { useQuery } from '@tanstack/react-query';
import { countryService } from '@services/index.ts';
import { queryKeys } from '@configuration';

const useGetCountryOptions = () => {
  return useQuery({
    queryKey: [queryKeys.COUNTRY.GET_AS_SELECT_OPTIONS],
    queryFn: () => countryService.getAllSelectOptions(),
  });
};

export default useGetCountryOptions;
