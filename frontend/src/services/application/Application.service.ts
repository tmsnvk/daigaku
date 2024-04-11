import { AxiosResponse } from 'axios';
import { axiosConfigWithAuth } from '@configuration';
import { ApplicationT } from '@custom-types/ApplicationT.ts';
import { NewApplicationFormFieldsT } from '@components/page/new-application/NewApplicationForm/NewApplicationForm.hooks.tsx';
import { DashboardDataT } from '@pages/shared/Dashboard/Dashboard.hooks.tsx';
import { UpdateApplicationFormFieldsT } from '@components/page/application/ApplicationForm/ApplicationForm.hooks.tsx';

const applicationService = {
  getByUuid: async (applicationUuid: string): Promise<AxiosResponse<ApplicationT>> => {
    return await axiosConfigWithAuth.request<ApplicationT>({
      method: 'GET',
      url: `/api/applications/${applicationUuid}`,
    });
  },
  getAllByRole: async (resource: string): Promise<AxiosResponse<ApplicationT[]>> => {
    return await axiosConfigWithAuth.request<ApplicationT[]>({
      method: 'GET',
      url: `/api/applications/${resource}`,
    });
  },
  postByStudent: async (data: NewApplicationFormFieldsT): Promise<AxiosResponse<ApplicationT>> => {
    return await axiosConfigWithAuth.request<ApplicationT>({
      method: 'POST',
      url: '/api/applications/students',
      data,
    });
  },
  patchByUuid: async (data: UpdateApplicationFormFieldsT, applicationUuid: string): Promise<AxiosResponse<ApplicationT>> => {
    // update this appropriate for mentor/admin links
    return await axiosConfigWithAuth.request<ApplicationT>({
      method: 'PATCH',
      url: `/api/applications/students/${applicationUuid}`,
      data,
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
