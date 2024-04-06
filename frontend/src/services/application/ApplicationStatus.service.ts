import { AxiosResponse } from 'axios';
import { axiosConfigWithAuth } from '@configuration';

export type ApplicationStatusT = {
  uuid: string;
  name: string;
}

const applicationStatusService = {
  getAll: async (): Promise<AxiosResponse<ApplicationStatusT[]>> => {
    return await axiosConfigWithAuth.request<ApplicationStatusT[]>({
      method: 'GET',
      url: '/api/application-statuses',
    });
  },
};

export default applicationStatusService;
