import { AxiosResponse } from 'axios';
import { axiosConfigWithAuth } from '@configuration';
import { NewApplicationFormFieldsT } from '@components/page/new-application/NewApplicationForm/NewApplicationForm.hooks.tsx';
import { ApplicationT } from '@custom-types/ApplicationT.ts';

const applicationService = {
  postByStudent: async (data: NewApplicationFormFieldsT): Promise<AxiosResponse<ApplicationT>> => {
    return await axiosConfigWithAuth.request<ApplicationT>({
      method: 'POST',
      url: '/api/applications/students',
      data,
    });
  },
};

export default applicationService;
