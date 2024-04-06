import { useQuery } from '@tanstack/react-query';
import {
  QUERY_KEYS,
  axiosConfigWithAuth,
} from '@configuration';

export type CountriesT = {
  uuid: string;
  name: string;
}

const getCountryOptions = async () => {
  try {
    const { data }: { data: CountriesT[] } = await axiosConfigWithAuth.request({
      method: 'GET',
      url: 'api/countries/options',
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};

const useGetCountryOptions = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.COUNTRY.GET_COUNTRY_SELECT_OPTIONS],
    queryFn: () => getCountryOptions(),
  });
};

export default useGetCountryOptions;
