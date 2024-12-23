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
import { axiosConfig, axiosConfigWithAuth } from '@configuration';

/* interface, type, enum imports */
import { LoginFormFields, LoginFormResponse, ResetFormFields } from '@common-types';

/**
 * Defines the operations of the {@link accountService} object, responsible for managing account-related API requests.
 */
interface AccountService {
  /**
   * Authenticates a user by sending a POST request with login credentials.
   * On successful authentication, the server responds with session data, logging the user in.
   *
   * @param formData The login form data object.
   * @return {Promise<LoginFormResponse>}
   * @throws {AxiosError}
   */
  logIn: (formData: LoginFormFields) => Promise<LoginFormResponse>;

  /**
   * Initiates a password reset by sending a POST request with user information.
   * On success, the server sends a password reset link and instructions via email.
   *
   * @param formData The reset form data object.
   * @return {Promise<void>}
   * @throws {AxiosError}
   */
  resetPassword: (formData: ResetFormFields) => Promise<void>;

  /**
   * Sends a GET request to fetch user details tied to the active session, used by the auth context.
   *
   * @return {Promise<LoginFormResponse>}
   * @throws {AxiosError}
   */
  getMe: () => Promise<LoginFormResponse>;
}

/**
 * Manages pending-account-related REST API operations, implementing {@link AccountService}.
 */
export const accountService: AccountService = {
  logIn: async (formData: LoginFormFields): Promise<LoginFormResponse> => {
    const response: AxiosResponse<LoginFormResponse> = await axiosConfig.request<LoginFormResponse>({
      method: 'POST',
      url: '/api/v1/accounts/log-in',
      data: formData,
    });

    return response.data;
  },
  resetPassword: async (formData: ResetFormFields): Promise<void> => {
    await axiosConfig.request<void>({
      method: 'POST',
      url: '/api/v1/accounts/reset-password',
      data: formData,
    });
  },
  getMe: async (): Promise<LoginFormResponse> => {
    const response: AxiosResponse<LoginFormResponse> = await axiosConfigWithAuth.request<LoginFormResponse>({
      method: 'GET',
      url: '/api/v1/accounts/me',
    });

    return response.data;
  },
};
