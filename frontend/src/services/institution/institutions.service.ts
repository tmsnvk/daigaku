import { AxiosResponse } from 'axios';
import { axiosConfigWithAuth } from '@configuration';

export type InstitutionOptionT = {
  uuid: string;
  city: string;
  name: string;
}

const institutionService = {
  getAll: async (): Promise<AxiosResponse<InstitutionOptionT[]>> => {
    return await axiosConfigWithAuth.request<InstitutionOptionT[]>({
      method: 'GET',
      url: '/api/institutions/options',
    });
  },
};

export default institutionService;
