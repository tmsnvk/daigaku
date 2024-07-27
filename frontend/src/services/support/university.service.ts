import { axiosConfigWithAuth } from '@configuration';

export interface UniversityOption {
  readonly uuid: string;
  readonly name: string;
  readonly abbreviation: string;
}

const universityService = {
  getOptionsByCountryUuid: async (selectedCountryUuid: string): Promise<Array<UniversityOption>> => {
    const { data } = await axiosConfigWithAuth.request<Array<UniversityOption>>({
      method: 'GET',
      url: `api/universities/options/${selectedCountryUuid}`,
    });

    return data;
  },
};

export default universityService;
