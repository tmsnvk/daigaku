import { AxiosResponse } from 'axios';
import { axiosConfigWithAuth } from '@configuration';

export type OfferStatusT = {
  uuid: string;
  name: string;
}

const offerStatusService = {
  getAll: async (): Promise<AxiosResponse<OfferStatusT[]>> => {
    return await axiosConfigWithAuth.request<OfferStatusT[]>({
      method: 'GET',
      url: '/api/offer-statuses',
    });
  },
};

export default offerStatusService;
