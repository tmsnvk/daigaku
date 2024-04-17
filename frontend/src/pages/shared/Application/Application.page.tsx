import { useLocation } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useGetApplication } from './Application.hooks.tsx';
import {
  GlobalErrorModal,
  GlobalLoadingModal,
} from '@components/shared/notification';
import { ApplicationForm } from '@components/page/application';
import { ApplicationT } from '@services/application/application.service.ts';

type LocationT = {
  state: ApplicationT;
  pathname: string;
}

const Application = () => {
  const { state, pathname } = useLocation() as LocationT;
  const applicationUuid = pathname.split('/applications/')[1];

  const { data, isLoading, isError, error } = useGetApplication(state, applicationUuid);

  if (isLoading) {
    return <GlobalLoadingModal />;
  }

  if (isError) {
    return <GlobalErrorModal error={error instanceof AxiosError && error?.response?.data.root} />;
  }

  return (
    <main>
      <ApplicationForm
        currentApplicationData={(state && state) || (data && data.data)}
        applicationUuid={applicationUuid}
      />
    </main>
  );
};

export default Application;
