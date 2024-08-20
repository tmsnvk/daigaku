import { axiosConfigWithAuth } from '@configuration';

import { DashboardData } from '@pages/common/dashboard/dashboard.hooks';

import { Application } from '@custom-types/index';

const applicationService = {
  getByUuid: async (applicationUuid: string): Promise<Application> => {
    const { data } = await axiosConfigWithAuth.request<Application>({
      method: 'GET',
      url: `/api/v1/applications/${applicationUuid}`,
    });

    return data;
  },
  getAllByRole: async (roleResource: string): Promise<Array<Application>> => {
    const { data } = await axiosConfigWithAuth.request<Array<Application>>({
      method: 'GET',
      url: `/api/v1/applications/${roleResource}`,
    });

    return data;
  },
  getDashboardData: async (roleResource: string): Promise<DashboardData> => {
    const { data } = await axiosConfigWithAuth.request<DashboardData>({
      method: 'GET',
      url: `/api/v1/applications/${roleResource}/dashboard`,
    });

    return data;
  },
};

export default applicationService;
