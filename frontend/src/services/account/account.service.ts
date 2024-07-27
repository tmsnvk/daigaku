import {
  axiosConfig,
  axiosConfigWithAuth,
} from '@configuration';

import {
  LoginFormFields,
  LoginFormReturnData,
} from '@pages/common/home/components/login-form/login-form.hooks';
import { ForgottenPasswordFormFields } from '@pages/common/home/components/forgotten-password-form/forgotten-password-form.hooks';

const accountService = {
  login: async (formData: LoginFormFields): Promise<LoginFormReturnData> => {
    const { data } = await axiosConfig.request<LoginFormReturnData>({
      method: 'POST',
      url: '/api/accounts/login',
      data: formData,
    });

    return data;
  },
  passwordReset: async (data: ForgottenPasswordFormFields): Promise<void> => {
    await axiosConfig.request({
      method: 'POST',
      url: '/api/accounts/forgotten-password',
      data,
    });
  },
  getMe: async (): Promise<LoginFormReturnData> => {
    const { data } = await axiosConfigWithAuth.request<LoginFormReturnData>({
      method: 'GET',
      url: '/api/accounts/me',
    });

    return data;
  },
};

export default accountService;
