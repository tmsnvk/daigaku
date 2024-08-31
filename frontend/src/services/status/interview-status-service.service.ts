/**
 * @prettier
 */

/* configuration imports */
import { axiosConfigWithAuth } from '@configuration';

/* interfaces, types, enums */
export interface InterviewStatus {
  readonly uuid: string;
  readonly name: string;
}

export const interviewStatusService = {
  /*
   * TODO - comment
   */
  getAll: async (): Promise<Array<InterviewStatus>> => {
    const { data } = await axiosConfigWithAuth.request<Array<InterviewStatus>>({
      method: 'GET',
      url: '/api/v1/interview-status',
    });

    return data;
  },
};
