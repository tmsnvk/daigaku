import { useQuery } from '@tanstack/react-query';
import { axiosConfigWithAuth } from '@configuration';

export type UniversitiesT = {
  uuid: string;
  name: string;
  abbreviation: string;
  country: string;
}

const getUniversities = async (selectedCountryId: string) => {
  try {
    const { data }: { data: UniversitiesT[] } = await axiosConfigWithAuth.request({
      method: 'GET',
      url: `api/universities/${selectedCountryId}`,
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};

const useGetUniversities = (isCountryFieldSelected: boolean, selectedCountryId: string) => {
  const query = useQuery({
    queryKey: ['getUniversities', selectedCountryId],
    queryFn: () => getUniversities(selectedCountryId),
    enabled: isCountryFieldSelected,
  });

  return {
    universityData: query.data,
    isUniversityDataLoading: query.isLoading,
    isUniversityDataError: query.isError,
  };
};

export default useGetUniversities;
