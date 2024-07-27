import { useLocation } from 'react-router-dom';

import { useGetAllSelectOptions } from '@hooks/application-status';
import { useGetApplication } from './application.hooks';

import {
  GlobalErrorModal,
  GlobalLoadingModal,
} from '@components/notification';
import ApplicationForm from './components/application-form';
import CommentSection from './components/comment-section';
import { MainGrid } from './application.styles';

import { ApplicationData } from '@services/application/application.service';
import { ApplicationOptionsData } from '@hooks/application-status/use-get-all-select-options';

interface Location {
  readonly state: ApplicationData;
  readonly pathname: string;
}

const Application = () => {
  const { state, pathname } = useLocation() as Location;
  const applicationUuid: string = pathname.split('/applications/')[1];

  const {
    selectOptions,
    isLoading: isOptionsLoading,
    isError: isOptionsError,
  }: ApplicationOptionsData = useGetAllSelectOptions();
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
