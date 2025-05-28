/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* configuration, utilities, constants imports */
import { axiosConfigWithAuth } from '@daigaku/configuration';
import { apiClientWrapper } from '@daigaku/utilities';

/* interface, type, enum, schema imports */
import {
  ApplicationRecord,
  CreateApplicationRecordByStudentPayload,
  UpdateApplicationRecordByStudentPayload,
} from '@daigaku/common-types';

/**
 * Defines student-application service operations, handling API requests and interactions for student-related
 * application management.
 */
interface ApplicationStudentService {
  /**
   * Sends a POST request to save application data in the database.
   *
   * @param formData The application form data object to be saved.
   * @return {Promise<ApplicationRecord>}
   *
   * @throws {UnauthorizedError} If the user enters incorrect form data, i.e. email/password pair do not match or the
   *   user does not have valid token.
   * @throws {FormValidationError} If the server returns field-level validation errors.
   * @throws {ServerError} If the server fails unexpectedly.
   * @throws {UnexpectedError} For any non-Axios or unrecognized error.
   */
  postByStudent: (formData: CreateApplicationRecordByStudentPayload) => Promise<ApplicationRecord>;

  /**
   * Updates an existing application record by uuid.
   *
   * @param formData The application update form data object.
   * @param applicationUuid The unique identifier of the application to be updated.
   * @return {Promise<ApplicationRecord>}
   *
   * @throws {UnauthorizedError} If the user enters incorrect form data, i.e. email/password pair do not match or the
   *   user does not have valid token.
   * @throws {FormValidationError} If the server returns field-level validation errors.
   * @throws {ServerError} If the server fails unexpectedly.
   * @throws {UnexpectedError} For any non-Axios or unrecognized error.
   */
  patchByUuid: (
    formData: UpdateApplicationRecordByStudentPayload,
    applicationUuid: string,
  ) => Promise<ApplicationRecord>;

  /**
   * Toggles the is_removable status of an application by uuid.
   *
   * @param applicationUuid The unique identifier of the application to toggle.
   * @return {Promise<void>}
   *
   * @throws {UnauthorizedError} If the user enters incorrect form data, i.e. email/password pair do not match or the
   *   user does not have valid token.
   * @throws {FormValidationError} If the server returns field-level validation errors.
   * @throws {ServerError} If the server fails unexpectedly.
   * @throws {UnexpectedError} For any non-Axios or unrecognized error.
   */
  toggleIsRemovable: (applicationUuid: string) => Promise<void>;

  /**
   * Initiates a .pdf download for all applications by sending a POST request to the server.
   * On success, the server sends an email to the user with the download link.
   *
   * @return {Promise<void>}
   *
   * @throws {UnauthorizedError} If the user enters incorrect form data, i.e. email/password pair do not match or the
   *   user does not have valid token.
   * @throws {FormValidationError} If the server returns field-level validation errors.
   * @throws {ServerError} If the server fails unexpectedly.
   * @throws {UnexpectedError} For any non-Axios or unrecognized error.
   */
  requestPdfDownload: () => Promise<void>;
}

/**
 * Manages student-application-related REST API operations, implementing {@link ApplicationStudentService}.
 */
export const applicationStudentService: ApplicationStudentService = {
  postByStudent: (formData: CreateApplicationRecordByStudentPayload): Promise<ApplicationRecord> => {
    return apiClientWrapper(() =>
      axiosConfigWithAuth.request<ApplicationRecord>({
        method: 'POST',
        url: '/api/v1/applications/student',
        data: formData,
      }));
  },
  patchByUuid: (
    formData: UpdateApplicationRecordByStudentPayload,
    applicationUuid: string,
  ): Promise<ApplicationRecord> => {
    return apiClientWrapper(() =>
      axiosConfigWithAuth.request<ApplicationRecord>({
        method: 'PATCH',
        url: `/api/v1/applications/student/${applicationUuid}`,
        data: formData,
      }));
  },
  toggleIsRemovable: (applicationUuid: string): Promise<void> => {
    return apiClientWrapper(() =>
      axiosConfigWithAuth.request<void>({
        method: 'PATCH',
        url: `/api/v1/applications/student/toggle-is-removable/${applicationUuid}`,
      }));
  },
  requestPdfDownload: (): Promise<void> => {
    return apiClientWrapper(() =>
      axiosConfigWithAuth.request<void>({
        method: 'POST',
        url: '/api/v1/applications/student/download-pdf',
      }));
  },
};
