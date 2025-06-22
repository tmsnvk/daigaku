/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { useNavigate } from 'react-router-dom';

/* logic imports */
import { useGetApplications } from '@daigaku/hooks';
import { useAuthenticationProvider } from '@daigaku/providers';
import { useDashboardStatisticsQuery } from './common/hooks/use-dashboard-statistics-query.tsx';

/* component imports */
import { CoreLoadingNotification } from '@daigaku/components/core';
import { GlobalErrorModal } from '@daigaku/components/notification';
import { LayoutStudent } from './layout-student';

/* configuration, utilities, constants imports */
import { joinTw } from '@daigaku/utilities';

/* interface, type imports */
import { UserRoles } from '@daigaku/common-types';

/**
 * Renders the application records' dashboard for authenticated users.
 * The page displays various aggregate data components based on the user's authorization level.
 *
 * @return {JSX.Element}
 */
export const Dashboard = (): JSX.Element => {
  const navigate = useNavigate();

  const { account, logOut } = useAuthenticationProvider();

  const { data: dashboardStatistics, isLoading, isError, error } = useDashboardStatisticsQuery();

  useGetApplications();

  if (isLoading) {
    return <CoreLoadingNotification intent={'light'} />;
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
    <main className={joinTw('flex flex-row flex-wrap gap-y-20', 'm-[5%]')}>
      {dashboardStatistics && account.role === UserRoles.ROLE_STUDENT && <LayoutStudent data={dashboardStatistics} />}
    </main>
  );
};
