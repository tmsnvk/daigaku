import { useQuery } from '@tanstack/react-query';
import { axiosConfigWithAuth } from '@configuration';

export type ApplicationT = {
  id: string;
  account: string;
  country: string;
  university: string;
  courseName: string;
  minorSubject: string;
  programmeLength: number;
  applicationStatus: string | null;
  interviewStatus: string | null;
  responseStatus: string | null;
  finalDestinationStatus: string | null;
  notes: string | null;
  createdAt: Date;
  lastUpdatedAt: Date;
}

const getApplications = async () => {
  try {
    const { data }: { data: ApplicationT[] } = await axiosConfigWithAuth.request({
      method: 'GET',
      url: 'api/applications',
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};

const useGetApplications = () => {
  const query = useQuery({
    queryKey: ['getApplications'],
    queryFn: () => getApplications(),
  });

  localStorage.setItem('applications', JSON.stringify(query.data));

  return {
    applicationData: query.data,
    isApplicationDataLoading: query.isLoading,
    isApplicationDataError: query.isError,
  };
};

export default useGetApplications;
