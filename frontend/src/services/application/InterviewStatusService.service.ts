import { AxiosResponse } from 'axios';
import { axiosConfigWithAuth } from '@configuration';

export type InterviewStatusT = {
  uuid: string;
  name: string;
}

const interviewStatusService = {
  getAll: async (): Promise<AxiosResponse<InterviewStatusT[]>> => {
    return await axiosConfigWithAuth.request<InterviewStatusT[]>({
      method: 'GET',
      url: '/api/interview-statuses',
    });
  },
};

export default interviewStatusService;
