/**
 * @prettier
 */

/* configuration imports */
import { axiosConfigWithAuth } from '@configuration';

/* interface, type, enum imports */
import { DashboardData } from '@pages/common/dashboard/dashboard.hooks';
import { Application } from '@common-types';

export const applicationService = {
  /*
   * TODO - comment
   */
  getByUuid: async (applicationUuid: string): Promise<Application> => {
    const { data } = await axiosConfigWithAuth.request<Application>({
      method: 'GET',
      url: `/api/v1/applications/${applicationUuid}`,
    });

    return data;
  },
  /*
   * TODO - comment
   */
  getAllByRole: async (roleResource: string): Promise<Array<Application>> => {
    const { data } = await axiosConfigWithAuth.request<Array<Application>>({
      method: 'GET',
      url: `/api/v1/applications/${roleResource}`,
    });

    return data;
  },
  /*
   * TODO - comment
   */
  getDashboardData: async (roleResource: string): Promise<DashboardData> => {
    const { data } = await axiosConfigWithAuth.request<DashboardData>({
      method: 'GET',
      url: `/api/v1/applications/${roleResource}/dashboard`,
    });

    return data;
  },
};
