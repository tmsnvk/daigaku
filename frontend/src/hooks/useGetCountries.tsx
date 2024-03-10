import { useQuery } from '@tanstack/react-query';
import { axiosConfigWithAuth } from '@configuration';

export type CountriesT = {
  uuid: string;
  name: string;
  abbreviation: string;
  countryCode: string;
}

const getCountries = async () => {
  try {
    const { data }: { data: CountriesT[] } = await axiosConfigWithAuth.request({
      method: 'GET',
      url: 'api/countries',
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};

const useGetCountries = () => {
  const query = useQuery({
    queryKey: ['getCountries'],
    queryFn: () => getCountries(),
  });

  return {
    countryData: query.data,
    isCountryDataLoading: query.isLoading,
    isCountryDataError: query.isError,
  };
};

export default useGetCountries;
