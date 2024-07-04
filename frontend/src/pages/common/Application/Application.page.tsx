import { useLocation } from 'react-router-dom';

import { useGetAllSelectOptions } from '@hooks/applicationStatuses';
import { useGetApplication } from './Application.hooks.tsx';

import {
  GlobalErrorModal,
  GlobalLoadingModal,
} from '@components/notification';
import ApplicationForm from './components/ApplicationForm';
import CommentSection from './components/CommentSection';
import { MainGrid } from './Application.styles.ts';

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
  } = useGetAllSelectOptions();
  const {
    data,
    isLoading: isApplicationLoading,
    isError: isApplicationError,
  } = useGetApplication(state, applicationUuid);

  if (isOptionsLoading || isApplicationLoading) {
    return <GlobalLoadingModal content={'The application is compiling your data...'} />;
  }

  if (isOptionsError || isApplicationError) {
    return <GlobalErrorModal />;
  }

  return (
    <MainGrid>
      <ApplicationForm
        currentApplicationData={(state && state) || (data && data)}
        applicationUuid={applicationUuid}
        selectOptions={selectOptions}
      />
      <CommentSection
        applicationUuid={applicationUuid}
      />
    </MainGrid>
  );
};

export default Application;
