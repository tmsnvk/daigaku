import { useLocation } from 'react-router-dom';

import { useGetApplication } from '@hooks/application';

import {
  GlobalErrorModal,
  GlobalLoadingModal,
} from '@components/notification';
import ApplicationDetails from './components/application-details';
import CommentSection from './components/comment-section';
import { MainGrid } from './application-view.styles';

import { ApplicationData } from '@services/application/application.service';

interface Location {
  readonly state: ApplicationData;
  readonly pathname: string;
}

const ApplicationView = () => {
  const { state, pathname } = useLocation() as Location;
  const applicationUuid: string = pathname.split('/applications/view/')[1];

  const {
    data,
    isLoading,
    isError,
  } = useGetApplication(state, applicationUuid);

  if (isLoading) {
    return <GlobalLoadingModal content={'The application is compiling your data...'} />;
  }

  if (isError) {
    return <GlobalErrorModal />;
  }

  return (
    <MainGrid>
      <ApplicationDetails
        data={(state && state) || (data && data)}
      />
      <CommentSection
        applicationUuid={applicationUuid}
      />
    </MainGrid>
  );
};

export default ApplicationView;
