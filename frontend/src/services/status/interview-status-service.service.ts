/**
 * @prettier
 */

import { axiosConfigWithAuth } from '@configuration';

export interface InterviewStatus {
  readonly uuid: string;
  readonly name: string;
}

export const interviewStatusService = {
  getAll: async (): Promise<Array<InterviewStatus>> => {
    const { data } = await axiosConfigWithAuth.request<Array<InterviewStatus>>({
      method: 'GET',
      url: '/api/v1/interview-status',
    });

    return data;
  },
};
