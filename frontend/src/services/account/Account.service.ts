import { AxiosResponse } from 'axios';
import { axiosConfig } from '@configuration';
import {
  LoginFormFieldsT,
  LoginFormReturnDataT,
} from '@components/page/home/LoginForm/LoginForm.hooks.tsx';

const accountService = {
  login: async (data: LoginFormFieldsT): Promise<AxiosResponse<LoginFormReturnDataT>> => {
    return await axiosConfig.request<LoginFormReturnDataT>({
      method: 'POST',
      url: '/api/accounts/login',
      data,
    });
  },
};

export default accountService;
