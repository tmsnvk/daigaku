import {
  axiosConfig,
  axiosConfigWithAuth,
} from '@configuration';
import {
  LoginFormFieldsT,
  LoginFormReturnDataT,
} from '@pages/shared/Home/components/LoginForm/LoginForm.hooks.tsx';
import { RegisterFormFieldsT } from '@pages/shared/Home/components/RegistrationForm/RegistrationForm.hooks.tsx';
import { ForgottenPasswordFormFieldsT } from '@pages/shared/Home/components/ForgottenPasswordForm/ForgottenPasswordForm.hooks.tsx';

const accountService = {
  login: async (formData: LoginFormFieldsT): Promise<LoginFormReturnDataT> => {
    const { data } = await axiosConfig.request<LoginFormReturnDataT>({
      method: 'POST',
      url: '/api/accounts/login',
      data: formData,
    });

    return data;
  },
  register: async (data: RegisterFormFieldsT): Promise<void> => {
    await axiosConfig.request({
      method: 'POST',
      url: '/api/pending-accounts/register',
      data,
    });
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
