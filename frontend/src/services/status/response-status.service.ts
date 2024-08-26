/**
 * @prettier
 */

import { axiosConfigWithAuth } from '@configuration';

export interface ResponseStatus {
  readonly uuid: string;
  readonly name: string;
}

export const responseStatusService = {
  getAll: async (): Promise<Array<ResponseStatus>> => {
    const { data } = await axiosConfigWithAuth.request<Array<ResponseStatus>>({
      method: 'GET',
      url: '/api/v1/response-status',
    });

    return data;
  },
};
