/**
 * @prettier
 */

/* configuration imports */
import { axiosConfigWithAuth } from '@configuration';

/* interfaces, types, enums */
export interface ApplicationStatus {
  readonly uuid: string;
  readonly name: string;
}

export const applicationStatusService = {
  /*
   * TODO - comment
   */
  getAll: async (): Promise<Array<ApplicationStatus>> => {
    const { data } = await axiosConfigWithAuth.request<Array<ApplicationStatus>>({
      method: 'GET',
      url: '/api/v1/application-status',
    });

    return data;
  },
};
