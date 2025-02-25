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
import { useGetDashboardStatistics } from './dashboard.hooks';

/* component imports */
import { GlobalErrorModal, GlobalLoadingModal } from '@components/notification';
import { StudentLayout } from './layouts';

/* configuration, utilities, constants imports */
import { localization as l } from '@constants';

/**
 * Renders the application records' dashboard for the logged-in user.
 * The page displays various aggregate data components based on the user's authorization level.
 *
 * @return {JSX.Element | undefined}
 */
export const Dashboard = (): JSX.Element | undefined => {
  const navigate = useNavigate();
  const { account, logOut } = useAuthContext();
  const { data, isLoading, isError, error } = useGetDashboardStatistics();

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
    data && (
      <main className={'flex flex-row flex-wrap gap-y-[5rem] m-[5%]'}>
        {account.role === AccountRoles.ROLE_STUDENT && <StudentLayout data={data} />}
      </main>
    )
  );
};
