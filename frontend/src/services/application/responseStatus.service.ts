import { axiosConfigWithAuth } from '@configuration';

export type ResponseStatusT = {
  uuid: string;
  name: string;
}

const responseStatusService = {
  getAll: async (): Promise<ResponseStatusT[]> => {
    const { data } = await axiosConfigWithAuth.request<ResponseStatusT[]>({
      method: 'GET',
      url: '/api/response-statuses',
    });

    return data;
  },
};

export default responseStatusService;
