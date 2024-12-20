/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* external imports */
import { JSX } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

/* logic imports */
import { AccountRoleValues, AuthContext, useAuth } from '@context/auth';
import { useGetApplications } from '@hooks/application';
import { DashboardStatistics, useGetDashboardStatistics } from './dashboard.hooks';

/* component, style imports */
import { GlobalErrorModal, GlobalLoadingModal } from '@components/notification';
import { Main } from './dashboard.styles';
import { StudentLayout } from './layouts/index';

/* configuration, utilities, constants imports */
import { constants } from './dashboard.constants';

/* interface, type, enum imports */
import { SimpleQueryResult } from '@common-types';

/**
 * ===============
 * Component {@link Dashboard}
 * ===============
 */

/**
 * Renders the application's dashboard for the logged-in user.
 * The component displays various aggregate data components based on the user's authorization level.
 *
 * @return {JSX.Element | undefined}
 *
 * @since 0.0.1
 */
export const Dashboard = (): JSX.Element | undefined => {
  // `react-router-dom` navigate object.
  const navigate: NavigateFunction = useNavigate();

  // Authentication context.
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
