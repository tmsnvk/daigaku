import { useQuery } from '@tanstack/react-query';
import {
  axiosConfigWithAuth,
  queryKeys,
} from '@configuration';
import { ApplicationT } from '@hooks/applications/useGetApplications.tsx';

const getApplication = async (id: string) => {
  try {
    const { data }: { data: ApplicationT } = await axiosConfigWithAuth.request({
      method: 'GET',
      url: `api/applications/${id}`,
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};

const useGetApplication = (state: ApplicationT | null, pathname: string) => {
  const id = pathname.split('/applications/')[1];

  return useQuery({
    queryKey: [queryKeys.getApplicationById],
    queryFn: () => getApplication(id),
    enabled: state === null,
  });
};

export {
  useGetApplication,
};
