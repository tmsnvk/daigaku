import { AxiosResponse } from 'axios';
import { axiosConfig } from '@configuration';
import {
  LoginFormFieldsT,
  LoginFormReturnDataT,
} from '@components/page/home/LoginForm/LoginForm.hooks.tsx';
import { RegisterFormFieldsT } from '@components/page/home/RegisterForm/RegisterForm.hooks.tsx';

const accountService = {
  login: async (data: LoginFormFieldsT): Promise<AxiosResponse<LoginFormReturnDataT>> => {
    return await axiosConfig.request<LoginFormReturnDataT>({
      method: 'POST',
      url: '/api/accounts/login',
      data,
    });
  },
  register: async (data: RegisterFormFieldsT): Promise<void> => {
    await axiosConfig.request({
      method: 'POST',
      url: '/api/pending-accounts/register',
      data,
    });
  },
};

export default accountService;
