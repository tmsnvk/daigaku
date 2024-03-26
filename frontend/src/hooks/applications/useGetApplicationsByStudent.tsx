import { useQuery } from '@tanstack/react-query';
import {
  axiosConfigWithAuth,
  queryKeys,
} from '@configuration';

export type ApplicationT = {
  id: string;
  account: string;
  country: string;
  university: string;
  courseName: string;
  minorSubject: string;
  programmeLength: number;
  applicationStatus: string;
  interviewStatus: string;
  responseStatus: string;
  finalDestinationStatus: string;
  notes: string | null;
  createdAt: Date;
  lastUpdatedAt: Date;
}

const getApplications = async () => {
  try {
    const { data }: { data: ApplicationT[] } = await axiosConfigWithAuth.request({
      method: 'GET',
      url: 'api/applications/students',
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};

const useGetApplicationsByStudent = () => {
  return useQuery({
    queryKey: [queryKeys.getApplicationsByStudent],
    queryFn: () => getApplications(),
  });
};

export default useGetApplicationsByStudent;
