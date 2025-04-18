/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { AxiosResponse } from 'axios';

/* configuration, utilities, constants imports */
import { axiosConfig, axiosConfigWithAuth } from '@daigaku/configuration';

/* interface, type, enum imports */
import { AccountResetRequest, LoginRequest, LoginResponse } from '@daigaku/common-types';

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
   * @throws {AxiosError}
   */
  logIn: (formData: LoginRequest) => Promise<LoginResponse>;

  /**
   * Initiates a password reset by sending a POST request with user information.
   * On success, the server sends a password reset link and instructions via email.
   *
   * @param formData The reset form data object.
   * @return {Promise<void>}
   * @throws {AxiosError}
   */
  resetPassword: (formData: AccountResetRequest) => Promise<void>;

  /**
   * Sends a GET request to fetch user details tied to the active session, used by the auth context.
   *
   * @return {Promise<LoginResponse>}
   * @throws {AxiosError}
   */
  getMe: () => Promise<LoginResponse>;
}

/**
 * Manages pending-account-related REST API operations, implementing {@link AccountService}.
 */
export const accountService: AccountService = {
  logIn: async (formData: LoginRequest): Promise<LoginResponse> => {
    const response: AxiosResponse<LoginResponse> = await axiosConfig.request<LoginResponse>({
      method: 'POST',
      url: '/api/v1/accounts/log-in',
      data: formData,
    });

    return response.data;
  },
  resetPassword: async (formData: AccountResetRequest): Promise<void> => {
    await axiosConfig.request<void>({
      method: 'POST',
      url: '/api/v1/accounts/reset-password',
      data: formData,
    });
  },
  getMe: async (): Promise<LoginResponse> => {
    const response: AxiosResponse<LoginResponse> = await axiosConfigWithAuth.request<LoginResponse>({
      method: 'GET',
      url: '/api/v1/accounts/me',
    });

    return response.data;
  },
};
