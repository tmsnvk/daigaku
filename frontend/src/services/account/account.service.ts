import {
  axiosConfig,
  axiosConfigWithAuth,
} from '@configuration';

import {
  LoginFormFieldsT,
  LoginFormReturnDataT,
} from '@pages/common/Home/components/LoginForm/LoginForm.hooks.tsx';
import { ForgottenPasswordFormFieldsT } from '@pages/common/Home/components/ForgottenPasswordForm/ForgottenPasswordForm.hooks.tsx';

const accountService = {
  login: async (formData: LoginFormFieldsT): Promise<LoginFormReturnDataT> => {
    const { data } = await axiosConfig.request<LoginFormReturnDataT>({
      method: 'POST',
      url: '/api/accounts/login',
      data: formData,
    });

    return data;
  },
  passwordReset: async (data: ForgottenPasswordFormFieldsT): Promise<void> => {
    await axiosConfig.request({
      method: 'POST',
      url: '/api/accounts/forgotten-password',
      data,
    });
  },
  getMe: async (): Promise<LoginFormReturnDataT> => {
    const { data } = await axiosConfigWithAuth.request<LoginFormReturnDataT>({
      method: 'GET',
      url: '/api/accounts/me',
    });

    return data;
  },
};

export default accountService;
