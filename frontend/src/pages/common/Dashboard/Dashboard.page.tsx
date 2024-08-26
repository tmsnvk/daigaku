/**
 * @prettier
 */

import { AccountRoleValues, AuthContext, useAuth } from '@context/auth';
import { useGetApplications } from '@hooks/application';
import { DashboardData, useGetDashboardData } from './dashboard.hooks';

import { StudentLayout } from './layouts/index';
import { TodoList } from './components/index';
import { GlobalErrorModal, GlobalLoadingModal } from '@components/notification';
import { Main } from './dashboard.styles';

import { SimpleQueryResult } from '@common-types';

export const Dashboard = () => {
  const { account }: Partial<AuthContext> = useAuth();
  const { data, isLoading, isError, error }: SimpleQueryResult<DashboardData> = useGetDashboardData();

  useGetApplications();

  if (isLoading) {
    return <GlobalLoadingModal content={'The application is compiling your data...'} />;
  }

  if (isError) {
    return <GlobalErrorModal content={error.message} />;
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
