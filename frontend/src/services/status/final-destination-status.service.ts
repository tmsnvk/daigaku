/**
 * @prettier
 */

/* configuration imports */
import { axiosConfigWithAuth } from '@configuration';

/* interfaces, types, enums */
export interface FinalDestinationStatus {
  readonly uuid: string;
  readonly name: string;
}

export const finalDestinationStatusService = {
  /*
   * TODO - comment
   */
  getAll: async (): Promise<Array<FinalDestinationStatus>> => {
    const { data } = await axiosConfigWithAuth.request<Array<FinalDestinationStatus>>({
      method: 'GET',
      url: '/api/v1/final-destination-status',
    });

    return data;
  },
};
