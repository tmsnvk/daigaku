/**
 * @prettier
 */

import { axiosConfigWithAuth } from '@configuration';

export interface FinalDestinationStatus {
  readonly uuid: string;
  readonly name: string;
}

export const finalDestinationStatusService = {
  getAll: async (): Promise<Array<FinalDestinationStatus>> => {
    const { data } = await axiosConfigWithAuth.request<Array<FinalDestinationStatus>>({
      method: 'GET',
      url: '/api/v1/final-destination-status',
    });

    return data;
  },
};
