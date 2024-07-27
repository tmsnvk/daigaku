import { axiosConfigWithAuth } from '@configuration';

export interface OfferStatus {
  readonly uuid: string;
  readonly name: string;
}

const offerStatusService = {
  getAll: async (): Promise<Array<OfferStatus>> => {
    const { data } = await axiosConfigWithAuth.request<Array<OfferStatus>>({
      method: 'GET',
      url: '/api/offer-statuses',
    });

    return data;
  },
};

export default offerStatusService;
