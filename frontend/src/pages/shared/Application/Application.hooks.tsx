import { useQuery } from '@tanstack/react-query';
import {
  axiosConfigWithAuth,
  queryKeys,
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
    queryKey: [queryKeys.getApplicationById],
    queryFn: () => getApplication(applicationId),
    enabled: state === null,
  });
};

export {
  useGetApplication,
};
