import { AxiosResponse } from 'axios';
import { axiosConfigWithAuth } from '@configuration';

export type UniversityOptionT = {
  uuid: string;
  name: string;
  abbreviation: string;
}

const universityService = {
  getOptionsByCountryUuid: async (selectedCountryUuid: string): Promise<AxiosResponse<UniversityOptionT[]>> => {
    return await axiosConfigWithAuth.request<UniversityOptionT[]>({
      method: 'GET',
      url: `api/universities/options/${selectedCountryUuid}`,
    });
  },
};

export default universityService;
