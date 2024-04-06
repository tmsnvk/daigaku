import { useQuery } from '@tanstack/react-query';
import {
  QUERY_KEYS,
  axiosConfigWithAuth,
} from '@configuration';

export type OfferStatusT = {
  uuid: string;
  name: string;
}

const getOfferStatuses = async (): Promise<OfferStatusT[]> => {
  const { data } = await axiosConfigWithAuth.request<OfferStatusT[]>({
    method: 'GET',
    url: '/api/offer-statuses',
  });

  return data;
};

const useGetOfferStatuses = () => {
  return useQuery<OfferStatusT[]>({
    queryKey: [QUERY_KEYS.OFFER_STATUS.GET_ALL],
    queryFn: () => getOfferStatuses(),
  });
};

export default useGetOfferStatuses;
