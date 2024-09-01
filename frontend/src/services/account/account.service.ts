/**
 * @prettier
 */

/* configuration imports */
import { axiosConfig, axiosConfigWithAuth } from '@configuration';

/* interface, type, enum imports */
import { LoginFormFields, LoginFormResponse } from '@pages/common/home/components/login-form/login-form.hooks';
import { ForgottenPasswordFormFields } from '@pages/common/home/components/reset-form/reset-form.hooks';
import { AxiosResponse } from 'axios';

export const accountService = {
  /*
   * TODO - comment
   */
  login: async (formData: LoginFormFields): Promise<LoginFormResponse> => {
    const response: AxiosResponse<LoginFormResponse> = await axiosConfig.request<LoginFormResponse>({
      method: 'POST',
      url: '/api/v1/accounts/login',
      data: formData,
    });
    return response.data;
  },
  /*
   * TODO - comment
   */
  passwordReset: async (data: ForgottenPasswordFormFields): Promise<void> => {
    await axiosConfig.request({
      method: 'POST',
      url: '/api/v1/accounts/forgotten-password',
      data,
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
