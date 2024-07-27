import { axiosConfigWithAuth } from '@configuration';

import { NewApplicationFormFields } from '@pages/student/new-application/components/new-application-form/new-application-form.hooks';
import { DashboardData } from '@pages/common/dashboard/dashboard.hooks';
import { UpdateApplicationFormFields } from '@pages/common/application/components/application-form/application-form.hooks';

export interface ApplicationData {
  readonly uuid: string;
  readonly account: string;
  readonly country: string;
  readonly university: string;
  readonly courseName: string;
  readonly minorSubject: string;
  readonly programmeLength: number;
  readonly applicationStatus: string;
  readonly interviewStatus: string;
  readonly offerStatus: string;
  readonly responseStatus: string;
  readonly finalDestinationStatus: string;
  readonly createdAt: Date;
  readonly lastUpdatedAt: Date;
  readonly createdBy: string;
  readonly lastModifiedBy: string;
  isRemovable: boolean;
}

const applicationService = {
  getByUuid: async (applicationUuid: string): Promise<ApplicationData> => {
    const { data } = await axiosConfigWithAuth.request<ApplicationData>({
      method: 'GET',
      url: `/api/applications/${applicationUuid}`,
    });

    return data;
  },
  getAllByRole: async (roleResource: string): Promise<Array<ApplicationData>> => {
    const { data } = await axiosConfigWithAuth.request<Array<ApplicationData>>({
      method: 'GET',
      url: `/api/applications/${roleResource}`,
    });

    return data;
  },
  postByStudent: async (formData: NewApplicationFormFields): Promise<ApplicationData> => {
    const { data } = await axiosConfigWithAuth.request<ApplicationData>({
      method: 'POST',
      url: '/api/applications/student',
      data: formData,
    });

    return data;
  },
  patchByUuid: async (formData: UpdateApplicationFormFields, applicationUuid: string): Promise<ApplicationData> => {
    // update this appropriate for mentor/admin links
    const { data } = await axiosConfigWithAuth.request<ApplicationData>({
      method: 'PATCH',
      url: `/api/applications/student/${applicationUuid}`,
      data: formData,
    });

    return data;
  },
  patchByUuidToMarkForDeletion: async (applicationUuid: string): Promise<void> => {
    await axiosConfigWithAuth.request({
      method: 'PATCH',
      url: `/api/applications/student/update-is-removable/${applicationUuid}`,
    });
  },
  getDashboardData: async (roleResource: string): Promise<DashboardData> => {
    const { data } = await axiosConfigWithAuth.request<DashboardData>({
      method: 'GET',
      url: `/api/applications/${roleResource}/dashboard`,
    });

    return data;
  },
  getDownloadRequest: async (): Promise<void> => {
    await axiosConfigWithAuth.request({
      method: 'POST',
      url: '/api/applications/student/download',
    });
  },
};

export default applicationService;
