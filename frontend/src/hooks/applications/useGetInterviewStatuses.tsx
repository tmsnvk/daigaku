import { useQuery } from '@tanstack/react-query';
import {
  QUERY_KEYS,
  axiosConfigWithAuth,
} from '@configuration';

export type InterviewStatusT = {
  uuid: string;
  name: string;
}

const getInterviewStatuses = async () => {
  try {
    const { data }: { data: InterviewStatusT[] } = await axiosConfigWithAuth.request({
      method: 'GET',
      url: '/api/interview-statuses',
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};

const useGetInterviewStatuses = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.INTERVIEW_STATUS.GET_ALL],
    queryFn: () => getInterviewStatuses(),
  });
};

export default useGetInterviewStatuses;
