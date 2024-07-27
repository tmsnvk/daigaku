import { axiosConfigWithAuth } from '@configuration';

export interface FinalDestinationStatus {
  readonly uuid: string;
  readonly name: string;
}

const finalDestinationStatusService = {
  getAll: async (): Promise<Array<FinalDestinationStatus>> => {
    const { data } = await axiosConfigWithAuth.request<Array<FinalDestinationStatus>>({
      method: 'GET',
      url: '/api/final-destination-statuses',
    });

    return data;
  },
};

export default finalDestinationStatusService;
