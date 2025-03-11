/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { useNavigate } from 'react-router-dom';

/* logic imports */
import { AccountRoles, useAuthContext } from '@context/auth';
import { useGetApplications } from '@hooks';
import { useDashboardStatisticsQuery } from './hooks';

/* component imports */
import { GlobalErrorModal, GlobalLoadingModal } from '@components/notification';
import { LayoutStudent } from './components';

/* configuration, utilities, constants imports */
import { localization as l } from '@constants';

/* interface, type, enum imports */
import { StudentDashboardStatistics } from '@common-types';

/**
 * Renders the application records' dashboard for authenticated users.
 * The page displays various aggregate data components based on the user's authorization level.
 *
 * @return {JSX.Element}
 */
export const Dashboard = (): JSX.Element => {
  const navigate = useNavigate();
  const { account, logOut } = useAuthContext();
  const { data, isLoading, isError, error } = useDashboardStatisticsQuery();

  useGetApplications();

  if (isLoading) {
    return (
      <GlobalLoadingModal
        isVisible={isLoading}
        loadingText={l.PAGES.COMMON.DASHBOARD.PAGE_LOADING}
      />
    );
  }

  if (isError) {
    return (
      <GlobalErrorModal
        isVisible={isError}
        errorText={error.message}
        onCloseModal={() => {
          logOut();
          navigate('/');
        }}
      />
    );
  }

  // Add layouts for other authentication level users.
  return (
    <main className={'flex flex-row flex-wrap gap-y-[5rem] m-[5%]'}>
      {account.role === AccountRoles.ROLE_STUDENT && <LayoutStudent data={data as StudentDashboardStatistics} />}
    </main>
  );
};
