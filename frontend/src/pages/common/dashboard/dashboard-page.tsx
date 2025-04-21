/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { useNavigate } from 'react-router-dom';

/* logic imports */
import { useAuthContext } from '@daigaku/context';
import { useGetApplications } from '@daigaku/hooks';
import { useDashboardStatisticsQuery } from './hooks';

/* component imports */
import { GlobalErrorModal, LoadingModal } from '@daigaku/components/notification';
import { LayoutStudent } from './components';

/* configuration, utilities, constants imports */
import { localization as l } from '@daigaku/constants';
import { joinTw } from '@daigaku/utilities';

/* interface, type, enum imports */
import { StudentDashboardStatistics, UserRoles } from '@daigaku/common-types';

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
      <LoadingModal
        isVisible={isLoading}
        status={l.PAGES.COMMON.DASHBOARD.PAGE_LOADING}
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
    <main className={joinTw('flex flex-row flex-wrap gap-y-20', 'm-[5%]')}>
      {account.role === UserRoles.ROLE_STUDENT && <LayoutStudent data={data as StudentDashboardStatistics} />}
    </main>
  );
};
