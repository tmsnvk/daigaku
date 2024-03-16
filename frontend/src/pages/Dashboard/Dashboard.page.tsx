import { AccountRoleE, useAuth } from '@context/AuthContext.tsx';
import { useGetDashboardData } from './Dashboard.hooks.tsx';
import { StudentLayout } from '@components/page/dashboard';
import { GlobalLoadingModal } from '@components/shared/modal';
import { MainContainer } from './Dashboard.styles.ts';

const DashboardPage = () => {
  const { account } = useAuth();
  const { data, isLoading, isError } = useGetDashboardData();

  if (isLoading) {
    return <GlobalLoadingModal />;
  }

  return (
    data &&
      <MainContainer>
        {account.accountRole === AccountRoleE.Student && <StudentLayout data={data} />}
        {/*{account.accountRole === AccountRoleE.Mentor && <PLACEHOLDER data={data} />}*/}
        {/*{account.accountRole === AccountRoleE.Admin && <PLACEHOLDER data={data} />}*/}
      </MainContainer>
  );
};

export default DashboardPage;
