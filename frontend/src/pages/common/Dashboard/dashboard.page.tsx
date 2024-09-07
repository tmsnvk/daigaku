/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 */

/* logic imports */
import { AccountRoleValues, AuthContext, useAuth } from '@context/auth';
import { useGetApplications } from '@hooks/application';
import { DashboardData, useGetDashboardData } from './dashboard.hooks';

/* component, style imports */
import { GlobalErrorModal, GlobalLoadingModal } from '@components/notification';
import { TodoList } from './components/index';
import { Main } from './dashboard.styles';
import { StudentLayout } from './layouts/index';

/* configuration, utilities, constants imports */
import { constants } from './dashboard.constants';

/* interface, type, enum imports */
import { SimpleQueryResult } from '@common-types';
import { NavigateFunction, useNavigate } from 'react-router-dom';

/*
 * component - TODO - add functionality description
 */
export const Dashboard = () => {
  const navigate: NavigateFunction = useNavigate();
  const { account }: Partial<AuthContext> = useAuth();
  const { data, isLoading, isError, error }: SimpleQueryResult<DashboardData> = useGetDashboardData();

  useGetApplications();

  if (isLoading) {
    return (
      <GlobalLoadingModal
        isVisible={isLoading}
        loadingText={constants.pageMessage.LOADING}
      />
    );
  }

  if (isError) {
    return (
      <GlobalErrorModal
        isVisible={isError}
        errorText={error.message}
        onCloseModal={() => {
          navigate('/');
        }}
      />
    );
  }

  return (
    data && (
      <Main>
        {/* TodoList will need to go into its related layout */}
        <TodoList data={data} />
        {account.role === AccountRoleValues.STUDENT && <StudentLayout data={data} />}
        {/*{account.accountRole === AccountRoleE.MENTOR && <PLACEHOLDER data={data} />}*/}
        {/*{account.accountRole === AccountRoleE.INSTITUTION_ADMIN && <PLACEHOLDER data={data} />}*/}
        {/*{account.accountRole === AccountRoleE.SYSTEM_ADMIN && <PLACEHOLDER data={data} />}*/}
      </Main>
    )
  );
};
