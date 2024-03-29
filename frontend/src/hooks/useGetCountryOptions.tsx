import { useQuery } from '@tanstack/react-query';
import {
  axiosConfigWithAuth,
  queryKeys,
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
    queryKey: [queryKeys.getCountryOptions],
    queryFn: () => getCountryOptions(),
  });
};

export default useGetCountryOptions;
