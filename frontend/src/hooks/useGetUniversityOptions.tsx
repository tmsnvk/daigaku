import { useQuery } from '@tanstack/react-query';
import { axiosConfigWithAuth } from '@configuration';

export type UniversitiesT = {
  uuid: string;
  name: string;
  abbreviation: string;
}

const getUniversityOptions = async (selectedCountryId: string) => {
  try {
    const { data }: { data: UniversitiesT[] } = await axiosConfigWithAuth.request({
      method: 'GET',
      url: `api/universities/options/${selectedCountryId}`,
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};

const useGetUniversityOptions = (isCountryFieldSelected: boolean, selectedCountryId: string) => {
  const query = useQuery({
    queryKey: ['getUniversityOptions', selectedCountryId],
    queryFn: () => getUniversityOptions(selectedCountryId),
    enabled: isCountryFieldSelected,
  });

  return {
    universityData: query.data,
    isUniversityDataLoading: query.isLoading,
    isUniversityDataError: query.isError,
  };
};

export default useGetUniversityOptions;
