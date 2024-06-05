import { AxiosError } from 'axios';
import { useLocation } from 'react-router-dom';
import { useGetAllSelectOptions } from '@hooks/applicationStatuses';
import { useGetApplication } from './Application.hooks.tsx';
import {
  GlobalErrorModal,
  GlobalLoadingModal,
} from '@components/notification';
import {
  ApplicationForm,
  CommentSection,
} from './components';
import { MainGridContainer } from './Application.styles.ts';
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

  if (isOptionsError || isApplicationError) {
    let errorMessage = '';

    if (optionsError instanceof AxiosError) {
      errorMessage += optionsError.response?.data.root;
    }

    if (applicationError instanceof AxiosError) {
      errorMessage += applicationError.response?.data.root;
    }

    return <GlobalErrorModal error={errorMessage} />;
  }

  return (
    <MainGridContainer>
      <ApplicationForm
        currentApplicationData={(state && state) || (data && data)}
        applicationUuid={applicationUuid}
        selectOptions={selectOptions}
      />
      <CommentSection
        applicationUuid={applicationUuid}
      />
    </MainGridContainer>
  );
};

export default Application;
