import {
  AccountRoleE,
  useAuth,
} from '@context/AuthContext.tsx';
import { useGetApplicationsByStudent } from '@hooks/applications';
import { useGetDashboardData } from './Dashboard.hooks.tsx';
import { StudentLayout } from '@components/page/dashboard';
import { TodoList } from '@components/page/dashboard/components';
import {
  GlobalErrorModal,
  GlobalLoadingModal,
} from '@components/shared/modal';
import { MainContainer } from './Dashboard.styles.ts';

const DashboardPage = () => {
  const { account } = useAuth();
  const { data, isLoading, isError } = useGetDashboardData();

  useGetApplicationsByStudent();

  if (isLoading) {
    return <GlobalLoadingModal />;
  }

  if (isError) {
    return <GlobalErrorModal />;
  }

  return (
    data &&
      <MainContainer>
        <TodoList data={data} />
        {account.role === AccountRoleE.STUDENT && <StudentLayout data={data} />}
        {/*{account.accountRole === AccountRoleE.MENTOR && <PLACEHOLDER data={data} />}*/}
        {/*{account.accountRole === AccountRoleE.ADMIN && <PLACEHOLDER data={data} />}*/}
      </MainContainer>
  );
};

export default DashboardPage;
