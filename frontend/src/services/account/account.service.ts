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

export const accountService: AccountService = {
  /*
   * TODO - comment
   */
  logIn: async (formData: LoginFormFields): Promise<LoginFormResponse> => {
    const response: AxiosResponse<LoginFormResponse> = await axiosConfig.request<LoginFormResponse>({
      method: 'POST',
      url: '/api/v1/accounts/log-in',
      data: formData,
    });
    return response.data;
  },
  /*
   * TODO - comment
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
    const { data } = await axiosConfigWithAuth.request<LoginFormResponse>({
      method: 'GET',
      url: '/api/v1/accounts/me',
    });

    return data;
  },
};
