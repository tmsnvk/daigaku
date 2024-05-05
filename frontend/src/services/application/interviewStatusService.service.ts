import { axiosConfigWithAuth } from '@configuration';

export type InterviewStatusT = {
  uuid: string;
  name: string;
}

const interviewStatusService = {
  getAll: async (): Promise<InterviewStatusT[]> => {
    const { data } = await axiosConfigWithAuth.request<InterviewStatusT[]>({
      method: 'GET',
      url: '/api/interview-statuses',
    });

    return data;
  },
};

export default interviewStatusService;
