import { AxiosResponse } from 'axios';
import { axiosConfigWithAuth } from '@configuration';

export type ResponseStatusT = {
  uuid: string;
  city: string;
  name: string;
}

const institutionService = {
  getAll: async (): Promise<AxiosResponse<ResponseStatusT[]>> => {
    return await axiosConfigWithAuth.request<ResponseStatusT[]>({
      method: 'GET',
      url: '/api/institutions',
    });
  },
};

export default institutionService;
