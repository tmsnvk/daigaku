/**
 * @prettier
 */

/* configuration imports */
import { axiosConfigWithAuth } from '@configuration';

/* interface, type, enum imports */
import { NewApplicationFormFields } from '@pages/student/new-application/components/new-application-form/new-application-form.hooks';
import { UpdateApplicationFormFields } from '@pages/common/application-edit/components/application-form/application-form.hooks';
import { Application } from '@common-types';

export const applicationStudentService = {
  /*
   * TODO - comment
   */
  postByStudent: async (formData: NewApplicationFormFields): Promise<Application> => {
    const { data } = await axiosConfigWithAuth.request<Application>({
      method: 'POST',
      url: '/api/v1/applications/student',
      data: formData,
    });

    return data;
  },
  /*
   * TODO - comment
   */
  patchByUuid: async (formData: UpdateApplicationFormFields, applicationUuid: string): Promise<Application> => {
    // update this appropriate for mentor/admin links
    const { data } = await axiosConfigWithAuth.request<Application>({
      method: 'PATCH',
      url: `/api/v1/applications/student/${applicationUuid}`,
      data: formData,
    });

    return data;
  },
    /*
   * TODO - comment
   */
  toggleIsRemovable: async (applicationUuid: string): Promise<void> => {
    await axiosConfigWithAuth.request({
      method: 'PATCH',
      url: `/api/v1/applications/student/toggle-is-removable/${applicationUuid}`,
    });
  },
    /*
   * TODO - comment
   */
  requestDownload: async (): Promise<void> => {
    await axiosConfigWithAuth.request({
      method: 'POST',
      url: '/api/v1/applications/student/download',
    });
  },
};
