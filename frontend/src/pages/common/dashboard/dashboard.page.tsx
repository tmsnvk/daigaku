/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

/* logic imports */
import { AccountRoleValues, AuthContext, useAuth } from '@context/auth';
import { useGetApplications } from '@hooks/application';
import { useGetDashboardStatistics } from './dashboard.hooks';

/* component, style imports */
import { GlobalErrorModal, GlobalLoadingModal } from '@components/notification';
import { Main } from './dashboard.styles';
import { StudentLayout } from './layouts';

/* configuration, utilities, constants imports */
import { constants } from './dashboard.constants';

/* interface, type, enum imports */
import { DashboardStatistics, SimpleQueryResult } from '@common-types';

/**
 * Renders the application's dashboard for the logged-in user.
 * The component displays various aggregate data components based on the user's authorization level.
 *
 * @return {JSX.Element | undefined}
 */
export const Dashboard = (): JSX.Element | undefined => {
  const navigate: NavigateFunction = useNavigate();
  const { account, logOut }: Partial<AuthContext> = useAuth();

  // Custom hook that fetches the user's dashboard statistics.
  const { data, isLoading, isError, error }: SimpleQueryResult<DashboardStatistics> = useGetDashboardStatistics();

  useGetApplications();

  if (isLoading) {
    return (
      <GlobalLoadingModal
        isVisible={isLoading}
        loadingText={constants.ui.LOADING}
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

  return (
    data && (
      <Main>
        {account.role === AccountRoleValues.STUDENT && <StudentLayout data={data} />}
        {/*{account.accountRole === AccountRoleE.MENTOR && <PLACEHOLDER data={data} />}*/}
        {/*{account.accountRole === AccountRoleE.INSTITUTION_ADMIN && <PLACEHOLDER data={data} />}*/}
        {/*{account.accountRole === AccountRoleE.SYSTEM_ADMIN && <PLACEHOLDER data={data} />}*/}
      </Main>
    )
  );
};
