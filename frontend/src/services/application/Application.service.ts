import { AxiosResponse } from 'axios';
import { axiosConfigWithAuth } from '@configuration';
import { ApplicationT } from '@custom-types/ApplicationT.ts';
import { NewApplicationFormFieldsT } from '@components/page/new-application/NewApplicationForm/NewApplicationForm.hooks.tsx';
import { DashboardDataT } from '@pages/shared/Dashboard/Dashboard.hooks.tsx';

const applicationService = {
  postByStudent: async (data: NewApplicationFormFieldsT): Promise<AxiosResponse<ApplicationT>> => {
    return await axiosConfigWithAuth.request<ApplicationT>({
      method: 'POST',
      url: '/api/applications/students',
      data,
    });
  },
  getAllByRole: async (resource: string): Promise<AxiosResponse<ApplicationT[]>> => {
    return await axiosConfigWithAuth.request<ApplicationT[]>({
      method: 'GET',
      url: `/api/applications/${resource}`,
    });
  },
  getDashboardData: async (userRole: string): Promise<AxiosResponse<DashboardDataT>> => {
    return await axiosConfigWithAuth.request<DashboardDataT>({
      method: 'GET',
      url: `api/applications/${userRole}/dashboard-data`,
    });
  },
};

export default applicationService;
