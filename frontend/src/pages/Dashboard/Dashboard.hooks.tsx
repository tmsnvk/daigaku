import { useQuery } from '@tanstack/react-query';
import { axiosConfigWithAuth } from '@configuration';

type DashboardDataT = {
  finalDestinationCountry: string;
  finalDestinationUniversity: string;
  finalDestinationCourseName: string;
  numberOfApplications: number;
  numberOfPlannedStatus: number;
  numberOfSubmittedStatus: number;
  numberOfWithdrawnStatus: number;
  numberOfDifferentCountries: number;
  numberOfDifferentUniversities: number;
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
