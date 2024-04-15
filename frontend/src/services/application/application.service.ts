import { AxiosResponse } from 'axios';
import { axiosConfigWithAuth } from '@configuration';
import { NewApplicationFormFieldsT } from '@components/page/new-application/NewApplicationForm/NewApplicationForm.hooks.tsx';
import { DashboardDataT } from '@pages/shared/Dashboard/Dashboard.hooks.tsx';
import { UpdateApplicationFormFieldsT } from '@components/page/application/ApplicationForm/ApplicationForm.hooks.tsx';

export type ApplicationT = {
  uuid: string;
  account: string;
  country: string;
  university: string;
  courseName: string;
  minorSubject: string;
  programmeLength: number;
  applicationStatus: string;
  interviewStatus: string;
  offerStatus: string;
  responseStatus: string;
  finalDestinationStatus: string;
  createdAt: Date;
  lastUpdatedAt: Date;
}

const applicationService = {
  getByUuid: async (applicationUuid: string): Promise<AxiosResponse<ApplicationT>> => {
    return await axiosConfigWithAuth.request<ApplicationT>({
      method: 'GET',
      url: `/api/applications/${applicationUuid}`,
    });
  },
  getAllByRole: async (roleResource: string): Promise<AxiosResponse<ApplicationT[]>> => {
    return await axiosConfigWithAuth.request<ApplicationT[]>({
      method: 'GET',
      url: `/api/applications/${roleResource}`,
    });
  },
  postByStudent: async (data: NewApplicationFormFieldsT): Promise<AxiosResponse<ApplicationT>> => {
    return await axiosConfigWithAuth.request<ApplicationT>({
      method: 'POST',
      url: '/api/applications/student',
      data,
    });
  },
  patchByUuid: async (data: UpdateApplicationFormFieldsT, applicationUuid: string): Promise<AxiosResponse<ApplicationT>> => {
    // update this appropriate for mentor/admin links
    return await axiosConfigWithAuth.request<ApplicationT>({
      method: 'PATCH',
      url: `/api/applications/student/${applicationUuid}`,
      data,
    });
  },
  getDashboardData: async (roleResource: string): Promise<AxiosResponse<DashboardDataT>> => {
    return await axiosConfigWithAuth.request<DashboardDataT>({
      method: 'GET',
      url: `api/applications/${roleResource}/dashboard`,
    });
  },
};

export default applicationService;
