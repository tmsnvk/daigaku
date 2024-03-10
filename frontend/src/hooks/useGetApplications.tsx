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
      url: 'api/applications',
    });

    localStorage.setItem('applications', JSON.stringify(data));

    return data;
  } catch (error) {
    console.error(error);
  }
};

const useGetApplications = () => {
  const query = useQuery({
    queryKey: ['getApplications'],
    queryFn: () => getApplications(),
    enabled: localStorage.getItem('applications') === null,
  });

  return {
    applicationData: query.data,
    isApplicationDataLoading: query.isLoading,
    isApplicationDataError: query.isError,
  };
};

export default useGetApplications;
