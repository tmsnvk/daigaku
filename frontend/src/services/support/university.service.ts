import { axiosConfigWithAuth } from '@configuration';

export type UniversityOptionT = {
  uuid: string;
  name: string;
  abbreviation: string;
}

const universityService = {
  getOptionsByCountryUuid: async (selectedCountryUuid: string): Promise<UniversityOptionT[]> => {
    const stuff = await axiosConfigWithAuth.request<UniversityOptionT[]>({
      method: 'GET',
      url: `api/universities/options/${selectedCountryUuid}`,
    });

    return stuff.data;
  },
};

export default universityService;
