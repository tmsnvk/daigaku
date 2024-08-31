/**
 * @prettier
 */

/* configuration imports */
import { axiosConfigWithAuth } from '@configuration';

/* interfaces, types, enums */
export interface ResponseStatus {
  readonly uuid: string;
  readonly name: string;
}

export const responseStatusService = {
  /*
   * TODO - comment
   */
  getAll: async (): Promise<Array<ResponseStatus>> => {
    const { data } = await axiosConfigWithAuth.request<Array<ResponseStatus>>({
      method: 'GET',
      url: '/api/v1/response-status',
    });

    return data;
  },
};
