import { useQuery } from '@tanstack/react-query';
import { axiosConfigWithAuth } from '@configuration';

export type UniversitiesT = {
  uuid: string;
  name: string;
  abbreviation: string;
  country: string;
}

const getUniversities = async () => {
  try {
    const { data }: { data: UniversitiesT[] } = await axiosConfigWithAuth.request({
      method: 'GET',
      url: 'api/universities',
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};

const useGetUniversities = () => {
  const query = useQuery({
    queryKey: ['getUniversities'],
    queryFn: () => getUniversities(),
  });

  return {
    universityData: query.data,
    isUniversityDataLoading: query.isLoading,
    isUniversityDataError: query.isError,
  };
};

export default useGetUniversities;
