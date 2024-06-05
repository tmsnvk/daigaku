import { axiosConfigWithAuth } from '@configuration';
import { NewApplicationFormFieldsT } from '@pages/student/NewApplication/components/NewApplicationForm/NewApplicationForm.hooks.tsx';
import { DashboardDataT } from '@pages/shared/Dashboard/Dashboard.hooks.tsx';
import { UpdateApplicationFormFieldsT } from '@pages/shared/Application/components/ApplicationForm/ApplicationForm.hooks.tsx';
import { NewCommentFormFieldsT } from '@pages/shared/Application/components/NewCommentBox/NewCommentBox.hooks.tsx';

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
  createdBy: string;
  lastModifiedBy: string;
  isRemovable: boolean;
}

export type ApplicationCommentT = {
  uuid: string;
  applicationUuid: string;
  accountUuid: string;
  content: string;
  numberOfLikes: number;
  createdAt: Date;
  lastUpdatedAt: Date;
  createdBy: string;
  lastModifiedBy: string;
}

const applicationService = {
  getByUuid: async (applicationUuid: string): Promise<ApplicationT> => {
    const { data } = await axiosConfigWithAuth.request<ApplicationT>({
      method: 'GET',
      url: `/api/applications/${applicationUuid}`,
    });

    return data;
  },
  getAllByRole: async (roleResource: string): Promise<ApplicationT[]> => {
    const { data } = await axiosConfigWithAuth.request<ApplicationT[]>({
      method: 'GET',
      url: `/api/applications/${roleResource}`,
    });

    return data;
  },
  postByStudent: async (formData: NewApplicationFormFieldsT): Promise<ApplicationT> => {
    const { data } = await axiosConfigWithAuth.request<ApplicationT>({
      method: 'POST',
      url: '/api/applications/student',
      data: formData,
    });

    return data;
  },
  patchByUuid: async (formData: UpdateApplicationFormFieldsT, applicationUuid: string): Promise<ApplicationT> => {
    // update this appropriate for mentor/admin links
    const { data } = await axiosConfigWithAuth.request<ApplicationT>({
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
  getDashboardData: async (roleResource: string): Promise<DashboardDataT> => {
    const { data } = await axiosConfigWithAuth.request<DashboardDataT>({
      method: 'GET',
      url: `/api/applications/${roleResource}/dashboard`,
    });

    return data;
  },
  postNewComment: async (formData: NewCommentFormFieldsT, applicationUuid: string): Promise<ApplicationCommentT> => {
    const { data } = await axiosConfigWithAuth.request<ApplicationCommentT>({
      method: 'POST',
      url: `/api/applications/comments/${applicationUuid}}`,
      data: formData,
    });

    return data;
  },
};

export default applicationService;
