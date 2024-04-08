import { AxiosResponse } from 'axios';
import { axiosConfigWithAuth } from '@configuration';
import { ApplicationT } from '@custom-types/ApplicationT.ts';
import { NewApplicationFormFieldsT } from '@components/page/new-application/NewApplicationForm/NewApplicationForm.hooks.tsx';

const applicationService = {
  postByStudent: async (data: NewApplicationFormFieldsT): Promise<AxiosResponse<ApplicationT>> => {
    return await axiosConfigWithAuth.request<ApplicationT>({
      method: 'POST',
      url: '/api/applications/students',
      data,
    });
  },
  getAllByRole: async (resource: string): Promise<AxiosResponse<ApplicationT[]>> => {
    return await axiosConfigWithAuth.request<ApplicationT[]>({
      method: 'GET',
      url: `/api/applications/${resource}`,
    });
  },
};

export default applicationService;
