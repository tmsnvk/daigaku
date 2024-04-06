import { useQuery } from '@tanstack/react-query';
import {
  axiosConfigWithAuth,
  queryKeys,
} from '@configuration';

export type ResponseStatusT = {
  uuid: string;
  name: string;
}

const getResponseStatuses = async (): Promise<ResponseStatusT[]> => {
  const { data } = await axiosConfigWithAuth.request<ResponseStatusT[]>({
    method: 'GET',
    url: '/api/response-statuses',
  });

  return data;
};

const useGetResponseStatus = () => {
  return useQuery<ResponseStatusT[]>({
    queryKey: [queryKeys.RESPONSE_STATUS.GET_ALL],
    queryFn: () => getResponseStatuses(),
  });
};

export default useGetResponseStatus;
