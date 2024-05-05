import { axiosConfigWithAuth } from '@configuration';

export type UniversityOptionT = {
  uuid: string;
  name: string;
  abbreviation: string;
}

const universityService = {
  getOptionsByCountryUuid: async (selectedCountryUuid: string): Promise<UniversityOptionT[]> => {
    const { data } = await axiosConfigWithAuth.request<UniversityOptionT[]>({
      method: 'GET',
      url: `api/universities/options/${selectedCountryUuid}`,
    });

    return data;
  },
};

export default universityService;
