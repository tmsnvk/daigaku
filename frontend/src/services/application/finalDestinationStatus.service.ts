import { axiosConfigWithAuth } from '@configuration';

export type FinalDestinationStatusT = {
  uuid: string;
  name: string;
}

const finalDestinationStatusService = {
  getAll: async (): Promise<FinalDestinationStatusT[]> => {
    const { data } = await axiosConfigWithAuth.request<FinalDestinationStatusT[]>({
      method: 'GET',
      url: '/api/final-destination-statuses',
    });

    return data;
  },
};

export default finalDestinationStatusService;
