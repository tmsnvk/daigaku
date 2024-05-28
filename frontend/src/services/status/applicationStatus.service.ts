import { axiosConfigWithAuth } from '@configuration';

export type ApplicationStatusT = {
  uuid: string;
  name: string;
}

const applicationStatusService = {
  getAll: async (): Promise<ApplicationStatusT[]> => {
    const { data } = await axiosConfigWithAuth.request<ApplicationStatusT[]>({
      method: 'GET',
      url: '/api/application-statuses',
    });

    return data;
  },
};

export default applicationStatusService;
