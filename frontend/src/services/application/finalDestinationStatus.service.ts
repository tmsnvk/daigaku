import { AxiosResponse } from 'axios';
import { axiosConfigWithAuth } from '@configuration';

export type FinalDestinationStatusT = {
  uuid: string;
  name: string;
}

const finalDestinationStatusService = {
  getAll: async (): Promise<AxiosResponse<FinalDestinationStatusT[]>> => {
    return await axiosConfigWithAuth.request<FinalDestinationStatusT[]>({
      method: 'GET',
      url: '/api/final-destination-statuses',
    });
  },
};

export default finalDestinationStatusService;
