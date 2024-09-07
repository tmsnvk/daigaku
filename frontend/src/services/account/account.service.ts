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

/* external imports */
import { AxiosResponse } from 'axios';

/* configuration, utilities, constants imports */
import { axiosConfig, axiosConfigWithAuth } from '@configuration';

/* interface, type, enum imports */
import { LoginFormFields, LoginFormResponse } from '@pages/common/home/components/login-form/login-form.hooks';
import { ResetFormFields } from '@pages/common/home/components/reset-form/reset-form.hooks';

/**
 * ===============
 * Service API Calls {@link accountService}
 * ===============
 */

/* interfaces, types, enums */
interface AccountService {
  logIn: (formData: LoginFormFields) => Promise<LoginFormResponse>;
  resetPassword: (formData: ResetFormFields) => Promise<void>;
  getMe: () => Promise<LoginFormResponse>;
}

/**
 * @description
 * The service manages account-related REST API operations.
 *
 * @property {Function} logIn
 * @property {Function} resetPassword
 * @property {Function} getMe
 *
 * @since 0.0.1
 */
export const accountService: AccountService = {
  /**
   * @description
   * The method sends a POST request with the provided login credentials.
   * The server handles the login process and responds accordingly. If the authentication was successful, the user is logged in.
   *
   * @param {LoginFormFields} formData - The login form data object.
   *
   * @returns {Promise<LoginFormResponse>} - A promise that resolves when the request is successfully sent.
   *
   * @throws {AxiosError} - Throws an error if the request fails.
   *
   * @since 0.0.1
   */
  logIn: async (formData: LoginFormFields): Promise<LoginFormResponse> => {
    const response: AxiosResponse<LoginFormResponse> = await axiosConfig.request<LoginFormResponse>({
      method: 'POST',
      url: '/api/v1/accounts/log-in',
      data: formData,
    });
    return response.data;
  },
  /**
   * @description
   * The method sends a POST request with the provided reset credentials.
   * The server handles the registration process and responds accordingly. If the authentication was successful,
   * the user receives an email to reset their password.
   *
   * @param {ResetFormFields} formData - The reset form data object.
   *
   * @returns {Promise<void>} - A promise that resolves when the request is successfully sent.
   *
   * @throws {AxiosError} - Throws an error if the request fails.
   */
  resetPassword: async (formData: ResetFormFields): Promise<void> => {
    await axiosConfig.request({
      method: 'POST',
      url: '/api/v1/accounts/reset-password',
      data: formData,
    });
  },
  /*
   * TODO - comment
   */
  getMe: async (): Promise<LoginFormResponse> => {
    const response: AxiosResponse<LoginFormResponse> = await axiosConfigWithAuth.request<LoginFormResponse>({
      method: 'GET',
      url: '/api/v1/accounts/me',
    });

    return response.data;
  },
};
