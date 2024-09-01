/**
 * @prettier
 */

/* configuration imports */
import { axiosConfig, axiosConfigWithAuth } from '@configuration';

/* interface, type, enum imports */
import { LoginFormFields, LoginFormReturnData } from '@pages/common/home/components/login-form/login-form.hooks';
import { ForgottenPasswordFormFields } from '@pages/common/home/components/reset-password-form/forgotten-password-form.hooks';

export const accountService = {
  /*
   * TODO - comment
   */
  login: async (formData: LoginFormFields): Promise<LoginFormReturnData> => {
    const { data } = await axiosConfig.request<LoginFormReturnData>({
      method: 'POST',
      url: '/api/v1/accounts/login',
      data: formData,
    });

    return data;
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
  getMe: async (): Promise<LoginFormReturnData> => {
    const { data } = await axiosConfigWithAuth.request<LoginFormReturnData>({
      method: 'GET',
      url: '/api/v1/accounts/me',
    });

    return data;
  },
};
