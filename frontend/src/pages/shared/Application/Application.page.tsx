import { useLocation } from 'react-router-dom';
import { useGetApplication } from './Application.hooks.tsx';
import {
  GlobalErrorModal,
  GlobalLoadingModal,
} from '@components/shared/modal';
import { ApplicationForm } from '@components/page/application';

const ApplicationPage = () => {
  const { state, pathname } = useLocation();
  const { data, isLoading, isError } = useGetApplication(state, pathname);

  if (isLoading) {
    return <GlobalLoadingModal />;
  }

  if (isError) {
    return <GlobalErrorModal />;
  }

  return (
    <main>
      <ApplicationForm data={state ? state : data } />
    </main>
  );
};

export default ApplicationPage;