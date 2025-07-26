/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* logic imports */
import { apiClient } from 'utilities/api-client';

/* configuration, constants imports */
import { axiosConfigWithAuth } from '@daigaku/configuration';

/* interface, type imports */
import {
  ApplicationResponse,
  CreateApplicationByStudentPayload,
  UpdateApplicationByStudentPayload,
} from '@daigaku/common-types';

/**
 * Defines student-application service operations, handling API requests and interactions for student-related
 * application management.
 */
interface ApplicationStudentService {
  /**
   * Fetches a list of applications accessible based on the user's authorization role.
   *
   * @param accountRole The user's authorization role.
   * @return {Promise<Array<ApplicationResponse>>}
   *
   * @throws {UnauthorizedError} If the user enters incorrect form data, i.e., an email/password pair do not match or
   *   the user does not have a valid token.
   * @throws {ServerError} If the server fails unexpectedly.
   * @throws {UnexpectedError} For any non-Axios or unrecognized error.
   */
  findAll: () => Promise<Array<ApplicationResponse>>;

  /**
   * Sends a POST request to save application data in the database.
   *
   * @param formData The application form data object to be saved.
   * @return {Promise<ApplicationResponse>}
   *
   * @throws {UnauthorizedError} If the user enters incorrect form data, i.e., an email/password pair do not match or
   *   the user does not have a valid token.
   * @throws {FormValidationError} If the server returns field-level validation errors.
   * @throws {ServerError} If the server fails unexpectedly.
   * @throws {UnexpectedError} For any non-Axios or unrecognized error.
   */
  create: (formData: CreateApplicationByStudentPayload) => Promise<ApplicationResponse>;

  /**
   * Updates an existing application record by uuid.
   *
   * @param formData The application update form data object.
   * @param uuid The unique identifier of the application to be updated.
   * @return {Promise<ApplicationResponse>}
   *
   * @throws {UnauthorizedError} If the user enters incorrect form data, i.e., an email/password pair do not match or
   *   the user does not have a valid token.
   * @throws {FormValidationError} If the server returns field-level validation errors.
   * @throws {ServerError} If the server fails unexpectedly.
   * @throws {UnexpectedError} For any non-Axios or unrecognized error.
   */
  updateByUuid: (formData: UpdateApplicationByStudentPayload, uuid: string) => Promise<ApplicationResponse>;

  /**
   * Toggles the is_removable status of an application by uuid.
   *
   * @param uuid The unique identifier of the application to toggle.
   * @return {Promise<void>}
   *
   * @throws {UnauthorizedError} If the user enters incorrect form data, i.e., an email/password pair do not match or
   *   the user does not have a valid token.
   * @throws {FormValidationError} If the server returns field-level validation errors.
   * @throws {ServerError} If the server fails unexpectedly.
   * @throws {UnexpectedError} For any non-Axios or unrecognized error.
   */
  toggleSoftDeleteFlag: (uuid: string) => Promise<void>;

  /**
   * Initiates a .pdf download for all applications by sending a POST request to the server.
   * On success, the server sends an email to the user with the download link.
   *
   * @return {Promise<void>}
   *
   * @throws {UnauthorizedError} If the user enters incorrect form data, i.e., an email/password pair do not match or
   *   the user does not have a valid token.
   * @throws {FormValidationError} If the server returns field-level validation errors.
   * @throws {ServerError} If the server fails unexpectedly.
   * @throws {UnexpectedError} For any non-Axios or unrecognized error.
   */
  initiatePdfDownloadRequest: () => Promise<void>;
}

/**
 * Manages student-application-related REST API operations, implementing {@link ApplicationStudentService}.
 */
export const applicationStudentService: ApplicationStudentService = {
  findAll: (): Promise<Array<ApplicationResponse>> => {
    return apiClient.serviceWrapper(() =>
      axiosConfigWithAuth.request<Array<ApplicationResponse>>({
        method: 'GET',
        url: '/api/v1/applications/student',
      }),
    );
  },
  create: (formData: CreateApplicationByStudentPayload): Promise<ApplicationResponse> => {
    return apiClient.serviceWrapper(() =>
      axiosConfigWithAuth.request<ApplicationResponse>({
        method: 'POST',
        url: '/api/v1/applications/student',
        data: formData,
      }),
    );
  },
  updateByUuid: (formData: UpdateApplicationByStudentPayload, uuid: string): Promise<ApplicationResponse> => {
    return apiClient.serviceWrapper(() =>
      axiosConfigWithAuth.request<ApplicationResponse>({
        method: 'PATCH',
        url: `/api/v1/applications/student/${uuid}`,
        data: formData,
      }),
    );
  },
  toggleSoftDeleteFlag: (uuid: string): Promise<void> => {
    return apiClient.serviceWrapper(() =>
      axiosConfigWithAuth.request<void>({
        method: 'PATCH',
        url: `/api/v1/applications/student/${uuid}/soft-delete`,
      }),
    );
  },
  initiatePdfDownloadRequest: (): Promise<void> => {
    return apiClient.serviceWrapper(() =>
      axiosConfigWithAuth.request<void>({
        method: 'POST',
        url: '/api/v1/applications/student/download/applications',
      }),
    );
  },
};
