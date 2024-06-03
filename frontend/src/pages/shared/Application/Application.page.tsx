import { AxiosError } from 'axios';
import { useLocation } from 'react-router-dom';
import { useGetAllSelectOptions } from '@hooks';
import { useGetApplication } from './Application.hooks.tsx';
import {
  GlobalErrorModal,
  GlobalLoadingModal,
} from '@components/notification';
import { ApplicationForm } from './components';
import { ApplicationT } from '@services/application/application.service.ts';

type LocationT = {
  state: ApplicationT;
  pathname: string;
}

const Application = () => {
  const { state, pathname } = useLocation() as LocationT;
  const applicationUuid = pathname.split('/applications/')[1];

  const {
    selectOptions,
    isLoading: isOptionsLoading,
    isError: isOptionsError,
    error: optionsError,
  } = useGetAllSelectOptions();
  const {
    data,
    isLoading: isApplicationLoading,
    isError: isApplicationError,
    error: applicationError,
  } = useGetApplication(state, applicationUuid);

  if (isOptionsLoading || isApplicationLoading) {
    return <GlobalLoadingModal />;
  }

  if ((isOptionsError && optionsError instanceof AxiosError)) {
    return <GlobalErrorModal error={optionsError.response?.data.root} />;
  }

  if (isApplicationError && applicationError instanceof AxiosError) {
    return <GlobalErrorModal error={applicationError.response?.data.root} />;
  }

  return (
    <main>
      <ApplicationForm
        currentApplicationData={(state && state) || (data && data)}
        applicationUuid={applicationUuid}
        selectOptions={selectOptions}
      />
    </main>
  );
};

export default Application;
