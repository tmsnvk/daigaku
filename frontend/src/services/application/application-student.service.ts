/**
 * @prettier
 */

import { axiosConfigWithAuth } from '@configuration';

import { NewApplicationFormFields } from '@pages/student/new-application/components/new-application-form/new-application-form.hooks';
import { UpdateApplicationFormFields } from '@pages/common/application-edit/components/application-form/application-form.hooks';

import { Application } from '@custom-types/index';

export const applicationStudentService = {
  postByStudent: async (formData: NewApplicationFormFields): Promise<Application> => {
    const { data } = await axiosConfigWithAuth.request<Application>({
      method: 'POST',
      url: '/api/v1/applications/student',
      data: formData,
    });

    return data;
  },
  patchByUuid: async (formData: UpdateApplicationFormFields, applicationUuid: string): Promise<Application> => {
    // update this appropriate for mentor/admin links
    const { data } = await axiosConfigWithAuth.request<Application>({
      method: 'PATCH',
      url: `/api/v1/applications/student/${applicationUuid}`,
      data: formData,
    });

    return data;
  },
  toggleIsRemovable: async (applicationUuid: string): Promise<void> => {
    await axiosConfigWithAuth.request({
      method: 'PATCH',
      url: `/api/v1/applications/student/toggle-is-removable/${applicationUuid}`,
    });
  },
  requestDownload: async (): Promise<void> => {
    await axiosConfigWithAuth.request({
      method: 'POST',
      url: '/api/v1/applications/student/download',
    });
  },
};
