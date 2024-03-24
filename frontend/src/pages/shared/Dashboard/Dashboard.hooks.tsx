import { useQuery } from '@tanstack/react-query';
import { axiosConfigWithAuth } from '@configuration';

export type DashboardDataT = {
  firmChoiceCountry: string;
  firmChoiceUniversity: string;
  firmChoiceCourseName: string;
  finalDestinationCountry: string;
  finalDestinationUniversity: string;
  finalDestinationCourseName: string;
  numberOfApplications: number;
  numberOfPlannedStatus: number;
  numberOfSubmittedStatus: number;
  numberOfWithdrawnStatus: number;
  numberOfDifferentCountries: number;
  numberOfDifferentUniversities: number;
  numberOfNotSetInterviewStatus: number;
  numberOfOffers: number;
}

const getDashboardData = async () => {
  try {
    const { data }: { data: DashboardDataT } = await axiosConfigWithAuth.request({
      method: 'GET',
      url: 'api/applications/dashboard-data',
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};

const useGetDashboardData = () => {
  const query = useQuery({
    queryKey: ['getDashboardData'],
    queryFn: () => getDashboardData(),
    refetchOnMount: 'always',
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
  };
};

export {
  useGetDashboardData,
};
