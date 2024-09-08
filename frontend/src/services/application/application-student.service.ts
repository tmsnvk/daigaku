/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 */

/* configuration imports */
import { axiosConfigWithAuth } from '@configuration';

/* interface, type, enum imports */
import { Application } from '@common-types';
import { UpdateApplicationFormFields } from '@pages/common/application-edit/components/application-form/application-form.hooks';
import { NewApplicationFormFields } from '@pages/student/new-application/components/new-application-form/new-application-form.hooks';

/**
 * ===============
 * Service API Calls {@link applicationStudentService}
 * ===============
 */

/* interfaces, types, enums */
interface ApplicationStudentService {
  postByStudent: (formData: NewApplicationFormFields) => Promise<Application>;
  patchByUuid: (formData: UpdateApplicationFormFields, applicationUuid: string) => Promise<Application>;
  toggleIsRemovable: (applicationUuid: string) => Promise<void>;
  requestPdfDownload: () => Promise<void>;
}

/**
 * @description
 * The service manages student authorisation-related application REST API operations.
 *
 * @property {Function} postByStudent
 * @property {Function} patchByUuid
 * @property {Function} toggleIsRemovable
 * @property {Function} requestPdfDownload
 *
 * @since 0.0.1
 */
export const applicationStudentService: ApplicationStudentService = {
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
  /**
   * @description
   * The method sends a POST request to the server to start handling the .pdf download process.
   *
   * @returns {Promise<void>}
   *
   * @throws {AxiosError}
   * Throws an error if the request fails.
   *
   * @since 0.0.1
   */
  requestPdfDownload: async (): Promise<void> => {
    await axiosConfigWithAuth.request({
      method: 'POST',
      url: '/api/v1/applications/student/download-pdf',
    });
  },
};
