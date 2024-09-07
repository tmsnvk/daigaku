/**
 * @prettier
 */

/* external imports */
import { useLocation } from 'react-router-dom';

/* logic imports */
import { useGetApplicationByUuid } from '@hooks/application';

/* component, style imports */
import { GlobalErrorModal, GlobalLoadingModal } from '@components/notification';
import { MainGrid } from './application-view.styles';
import { ApplicationDetails } from './components/application-details';
import { CommentSection } from './components/comment-section';

/* interface, type, enum imports */
import { Application, Location, SimpleQueryResult } from '@common-types';

/*
 * component - TODO - add functionality description
 */
export const ApplicationView = () => {
  const { state, pathname }: Location = useLocation();
  const applicationUuid: string = pathname.split('/applications/view/')[1];
  const { data, isLoading, isError }: SimpleQueryResult<Application> = useGetApplicationByUuid(state, applicationUuid);
  const application: Application = state || data;

  if (isLoading) {
    return <GlobalLoadingModal loadingText={'The application is compiling your data...'} />;
  }

  if (isError) {
    return <GlobalErrorModal />;
  }

  return (
    <MainGrid>
      <ApplicationDetails application={application} />
      <CommentSection applicationUuid={applicationUuid} />
    </MainGrid>
  );
};
