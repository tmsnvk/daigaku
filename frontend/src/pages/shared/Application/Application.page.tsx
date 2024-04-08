import { useLocation } from 'react-router-dom';
import { useGetApplication } from './Application.hooks.tsx';
import {
  GlobalErrorModal,
  GlobalLoadingModal,
} from 'components/shared/notification';
import { ApplicationForm } from '@components/page/application';

const Application = () => {
  const { state, pathname } = useLocation();
  const applicationId = pathname.split('/applications/')[1];

  const { data, isLoading, isError } = useGetApplication(state, applicationId);

  if (isLoading) {
    return <GlobalLoadingModal />;
  }

  if (isError) {
    return <GlobalErrorModal />;
  }

  return (
    <main>
      <ApplicationForm
        applicationData={state ? state : data }
        applicationId={applicationId}
      />
    </main>
  );
};

export default Application;
