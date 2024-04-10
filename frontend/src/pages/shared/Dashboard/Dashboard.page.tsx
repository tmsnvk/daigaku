import {
  AccountRoleE,
  useAuth,
} from '@context/AuthContext.tsx';
import { useGetApplications } from '@hooks/applications';
import { useGetDashboardData } from './Dashboard.hooks.tsx';
import { StudentLayout } from '@components/page/dashboard';
import { TodoList } from '@components/page/dashboard/components';
import {
  GlobalErrorModal,
  GlobalLoadingModal,
} from 'components/shared/notification';
import { Main } from './Dashboard.styles.ts';

const Dashboard = () => {
  const { account } = useAuth();
  const { data, isLoading, isError } = useGetDashboardData();

  useGetApplications();

  if (isLoading) {
    return <GlobalLoadingModal />;
  }

  if (isError) {
    return <GlobalErrorModal />;
  }

  return (
    data &&
      <Main>
        <TodoList data={data.data} />
        {account.role === AccountRoleE.STUDENT && <StudentLayout data={data.data} />}
        {/*{account.accountRole === AccountRoleE.MENTOR && <PLACEHOLDER applicationData={applicationData} />}*/}
        {/*{account.accountRole === AccountRoleE.ADMIN && <PLACEHOLDER applicationData={applicationData} />}*/}
      </Main>
  );
};

export default Dashboard;
