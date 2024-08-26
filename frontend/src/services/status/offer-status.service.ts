/**
 * @prettier
 */

import { axiosConfigWithAuth } from '@configuration';

export interface OfferStatus {
  readonly uuid: string;
  readonly name: string;
}

export const offerStatusService = {
  getAll: async (): Promise<Array<OfferStatus>> => {
    const { data } = await axiosConfigWithAuth.request<Array<OfferStatus>>({
      method: 'GET',
      url: '/api/v1/offer-status',
    });

    return data;
  },
};
