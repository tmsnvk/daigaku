import { useQuery } from '@tanstack/react-query';
import { axiosConfigWithAuth } from '@configuration';

export type UniversitiesT = {
  uuid: string;
  name: string;
  abbreviation: string;
  country: string;
}

const getUniversities = async (selectedCountry: string) => {
  try {
    const { data }: { data: UniversitiesT[] } = await axiosConfigWithAuth.request({
      method: 'GET',
      url: `api/universities/${selectedCountry}`,
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};

const useGetUniversities = (isCountryFieldSelected: boolean, selectedCountry: string) => {
  const query = useQuery({
    queryKey: ['getUniversities'],
    queryFn: () => getUniversities(selectedCountry),
    enabled: isCountryFieldSelected,
  });

  return {
    universityData: query.data,
    isUniversityDataLoading: query.isLoading,
    isUniversityDataError: query.isError,
    refetch: query.refetch,
  };
};

export default useGetUniversities;
