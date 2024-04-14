import { AxiosResponse } from 'axios';
import { axiosConfigWithAuth } from '@configuration';

export type ResponseStatusT = {
  uuid: string;
  name: string;
}

const responseStatusService = {
  getAll: async (): Promise<AxiosResponse<ResponseStatusT[]>> => {
    return await axiosConfigWithAuth.request<ResponseStatusT[]>({
      method: 'GET',
      url: '/api/response-statuses',
    });
  },
};

export default responseStatusService;
