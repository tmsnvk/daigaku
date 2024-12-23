/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { AxiosResponse } from 'axios';

/* configuration, utilities, constants imports */
import { axiosConfigWithAuth } from '@configuration';

/* interface, type, enum imports */
import { Application, CreateApplicationFormFields, UpdateApplicationFormFields } from '@common-types';

/**
 * Defines the operations of the {@link applicationStudentService} object,
 * responsible for managing student-application-related API requests.
 */
interface ApplicationStudentService {
  /**
   * Sends a POST request to save application data in the database.
   *
   * @param formData The application form data object to be saved.
   * @return {Promise<Application>}
   * @throws {AxiosError}
   */
  postByStudent: (formData: CreateApplicationFormFields) => Promise<Application>;

  /**
   * Updates an existing application record by uuid.
   *
   * @param formData The application update form data object.
   * @param applicationUuid The unique identifier of the application to be updated.
   * @return {Promise<Application>}
   * @throws {AxiosError}
   */
  patchByUuid: (formData: UpdateApplicationFormFields, applicationUuid: string) => Promise<Application>;

  /**
   * Toggles the is_removable status of an application by uuid.
   *
   * @param applicationUuid The unique identifier of the application to toggle.
   * @return {Promise<void>}
   * @throws {AxiosError}
   */
  toggleIsRemovable: (applicationUuid: string) => Promise<void>;

  /**
   * Initiates a .pdf download for all applications by sending a POST request to the server.
   * On success, the server sends an email to the user with the download link.
   *
   * @return {Promise<void>}
   * @throws {AxiosError}
   */
  requestPdfDownload: () => Promise<void>;
}

/**
 * Manages student-application-related REST API operations, implementing {@link ApplicationStudentService}.
 */
export const applicationStudentService: ApplicationStudentService = {
  postByStudent: async (formData: CreateApplicationFormFields): Promise<Application> => {
    const response: AxiosResponse<Application> = await axiosConfigWithAuth.request<Application>({
      method: 'POST',
      url: '/api/v1/applications/student',
      data: formData,
    });

    return response.data;
  },
  patchByUuid: async (formData: UpdateApplicationFormFields, applicationUuid: string): Promise<Application> => {
    const response: AxiosResponse<Application> = await axiosConfigWithAuth.request<Application>({
      method: 'PATCH',
      url: `/api/v1/applications/student/${applicationUuid}`,
      data: formData,
    });

    return response.data;
  },
  toggleIsRemovable: async (applicationUuid: string): Promise<void> => {
    await axiosConfigWithAuth.request<void>({
      method: 'PATCH',
      url: `/api/v1/applications/student/toggle-is-removable/${applicationUuid}`,
    });
  },
  requestPdfDownload: async (): Promise<void> => {
    await axiosConfigWithAuth.request<void>({
      method: 'POST',
      url: '/api/v1/applications/student/download-pdf',
    });
  },
};
