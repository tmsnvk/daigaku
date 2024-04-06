import { useQuery } from '@tanstack/react-query';
import {
  QUERY_KEYS,
  axiosConfigWithAuth,
} from '@configuration';

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
  return useQuery({
    queryKey: [QUERY_KEYS.UNIVERSITY.GET_AS_SELECT_OPTIONS, selectedCountryId],
    queryFn: () => getUniversityOptions(selectedCountryId),
    enabled: isCountryFieldSelected,
  });
};

export default useGetUniversityOptions;
