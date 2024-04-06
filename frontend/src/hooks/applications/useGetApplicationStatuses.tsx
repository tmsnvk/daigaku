import { useQuery } from '@tanstack/react-query';
import {
  QUERY_KEYS,
  axiosConfigWithAuth,
} from '@configuration';

export type ApplicationStatusT = {
  uuid: string;
  name: string;
}

const getApplicationStatus = async () => {
  try {
    const { data }: { data: ApplicationStatusT[] } = await axiosConfigWithAuth.request({
      method: 'GET',
      url: '/api/application-statuses',
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};

const useGetApplicationStatuses = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.APPLICATION_STATUS.GET_ALL],
    queryFn: () => getApplicationStatus(),
  });
};

export default useGetApplicationStatuses;
