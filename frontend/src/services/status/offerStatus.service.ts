import { axiosConfigWithAuth } from '@configuration';

export type OfferStatusT = {
  uuid: string;
  name: string;
}

const offerStatusService = {
  getAll: async (): Promise<OfferStatusT[]> => {
    const { data } = await axiosConfigWithAuth.request<OfferStatusT[]>({
      method: 'GET',
      url: '/api/offer-statuses',
    });

    return data;
  },
};

export default offerStatusService;
