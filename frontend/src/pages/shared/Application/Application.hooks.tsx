import { useQuery } from '@tanstack/react-query';
import {
  queryKeys,
  axiosConfigWithAuth,
} from '@configuration';
import { ApplicationT } from '@custom-types/ApplicationT.ts';

const getApplication = async (id: string) => {
  try {
    const { data }: { data: ApplicationT } = await axiosConfigWithAuth.request({
      method: 'GET',
      url: `/api/applications/${id}`,
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};

const useGetApplication = (state: ApplicationT | null, applicationId: string) => {
  return useQuery({
    queryKey: [queryKeys.APPLICATION.GET_BY_ID],
    queryFn: () => getApplication(applicationId),
    enabled: state === null,
  });
};

export {
  useGetApplication,
};
