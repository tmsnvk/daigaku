/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* logic imports */
import { apiClient } from '@daigaku/utilities';

/* configuration, constants imports */
import { axiosConfig, axiosConfigWithAuth } from '@daigaku/configuration';

/* interface, type imports */
import { LoginPayload, LoginResponse, PasswordResetPayload } from '@daigaku/common-types';

/**
 * Defines account service-related operations, handling API requests and interactions for account management.
 */
interface AccountService {
  /**
   * Authenticates a user by sending a POST request with login credentials.
   * On successful authentication, the server responds with session data, logging the user in.
   *
   * @param formData The login form data object.
   * @return {Promise<LoginResponse>}
   *
   * @throws {UnauthorizedError} If the user enters incorrect form data, i.e. email/password pair do not match or the
   *   user does not have valid token.
   * @throws {FormValidationError} If the server returns field-level validation errors.
   * @throws {ServerError} If the server fails unexpectedly.
   * @throws {UnexpectedError} For any non-Axios or unrecognized error.
   */
  logIn: (formData: LoginPayload) => Promise<LoginResponse>;

  /**
   * Initiates a password reset by sending a POST request with user information.
   * On success, the server sends a password reset link and instructions via email.
   *
   * @param formData The reset form data object.
   * @return {Promise<void>}
   *
   * @throws {FormValidationError} If the server returns field-level validation errors.
   * @throws {ServerError} If the server fails unexpectedly.
   * @throws {UnexpectedError} For any non-Axios or unrecognized error.
   */
  resetPassword: (formData: PasswordResetPayload) => Promise<void>;

  /**
   * Sends a GET request to fetch user details tied to the active session, used by the auth context.
   *
   * @return {Promise<LoginResponse>}
   *
   * @throws {UnauthorizedError} If the user enters incorrect form data, i.e. email/password pair do not match or the
   *   user does not have valid token.
   * @throws {FormValidationError} If the server returns field-level validation errors.
   * @throws {ServerError} If the server fails unexpectedly.
   * @throws {UnexpectedError} For any non-Axios or unrecognized error.
   */
  getMe: () => Promise<LoginResponse>;
}

/**
 * Manages account-related REST API operations, implementing {@link AccountService}.
 */
export const accountService: AccountService = {
  getMe: (): Promise<LoginResponse> => {
    return apiClient.serviceWrapper(() =>
      axiosConfigWithAuth.request<LoginResponse>({
        method: 'GET',
        url: '/api/v1/accounts/me',
      }),
    );
  },
  logIn: (formData: LoginPayload): Promise<LoginResponse> => {
    return apiClient.serviceWrapper(() =>
      axiosConfig.request<LoginResponse>({
        method: 'POST',
        url: '/api/v1/accounts/login',
        data: formData,
      }),
    );
  },
  resetPassword: (formData: PasswordResetPayload): Promise<void> => {
    return apiClient.serviceWrapper(() =>
      axiosConfig.request<void>({
        method: 'POST',
        url: '/api/v1/accounts/password-reset',
        data: formData,
      }),
    );
  },
};
