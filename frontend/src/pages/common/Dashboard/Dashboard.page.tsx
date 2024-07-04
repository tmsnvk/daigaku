import {
  AccountRoleE,
  useAuth,
} from '@context/AuthContext.tsx';
import { useGetApplications } from '@hooks/application';
import { useGetDashboardData } from './Dashboard.hooks.tsx';

import { StudentLayout } from './layouts';
import { TodoList } from './components';
import {
  GlobalErrorModal,
  GlobalLoadingModal,
} from '@components/notification';
import { Main } from './Dashboard.styles.ts';

const Dashboard = () => {
  const { account } = useAuth();
  const { data, isLoading, isError, error } = useGetDashboardData();

  useGetApplications();

  if (isLoading) {
    return <GlobalLoadingModal content={'The application is compiling your data...'} />;
  }

  if (isError) {
    return <GlobalErrorModal content={error.message} />;
  }

  return (
    data &&
      <Main>
        {/* TodoList will need to go into its related layout */}
        <TodoList data={data} />
        {account.role === AccountRoleE.STUDENT && <StudentLayout data={data} />}
        {/*{account.accountRole === AccountRoleE.MENTOR && <PLACEHOLDER data={data} />}*/}
        {/*{account.accountRole === AccountRoleE.INSTITUTION_ADMIN && <PLACEHOLDER data={data} />}*/}
        {/*{account.accountRole === AccountRoleE.SYSTEM_ADMIN && <PLACEHOLDER data={data} />}*/}
      </Main>
  );
};

export default Dashboard;
