/**
 * @prettier
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

/* interface, type, enum imports */
import { SimpleQueryResult } from '@common-types';

/*
 * component - TODO - add functionality description
 */
export const Dashboard = () => {
  const { account }: Partial<AuthContext> = useAuth();
  const { data, isLoading, isError, error }: SimpleQueryResult<DashboardData> = useGetDashboardData();

  useGetApplications();

  if (isLoading) {
    return <GlobalLoadingModal loadingText={'The application is compiling your data...'} />;
  }

  if (isError) {
    return <GlobalErrorModal errorText={error.message} />;
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
