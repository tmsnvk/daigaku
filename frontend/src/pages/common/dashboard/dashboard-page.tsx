/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/* logic imports */
import { useAuthContext } from '@daigaku/context';
import { useGetApplications } from '@daigaku/hooks';
import { useDashboardStatisticsQuery } from './hooks';

/* component imports */
import { GlobalErrorModal, LoadingModal } from '@daigaku/components/notification';
import { LayoutStudent } from './components';

/* configuration, utilities, constants imports */
import { joinTw } from '@daigaku/utilities';

/* interface, type, enum imports */
import { StudentDashboardStatisticsResponse, UserRole } from '@daigaku/common-types';

/* configuration, utilities, constants imports */

/* interface, type, enum imports */

/**
 * Renders the application records' dashboard for authenticated users.
 * The page displays various aggregate data components based on the user's authorization level.
 *
 * @return {JSX.Element}
 */
export const Dashboard = (): JSX.Element => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { account, logOut } = useAuthContext();

  const { data: dashboardStatistics, isLoading, isError, error } = useDashboardStatisticsQuery();

  useGetApplications();

  if (isLoading) {
    return (
      <LoadingModal
        isVisible={isLoading}
        status={t('dataCompilation')}
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
      {account.role === UserRole.ROLE_STUDENT && (
        <LayoutStudent data={dashboardStatistics as StudentDashboardStatisticsResponse} />
      )}
    </main>
  );
};
