import { useQuery } from '@tanstack/react-query';
import { axiosConfigWithAuth } from '@configuration';

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
  const query = useQuery({
    queryKey: ['getCountryOptions'],
    queryFn: () => getCountryOptions(),
  });

  return {
    countryData: query.data,
    isCountryDataLoading: query.isLoading,
    isCountryDataError: query.isError,
  };
};

export default useGetCountryOptions;
