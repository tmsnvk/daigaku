/**
 * @prettier
 */

/* configuration imports */
import { axiosConfigWithAuth } from '@configuration';

/* interfaces, types, enums */
export interface OfferStatus {
  readonly uuid: string;
  readonly name: string;
}

export const offerStatusService = {
  /*
   * TODO - comment
   */
  getAll: async (): Promise<Array<OfferStatus>> => {
    const { data } = await axiosConfigWithAuth.request<Array<OfferStatus>>({
      method: 'GET',
      url: '/api/v1/offer-status',
    });

    return data;
  },
};
