/**
 * @prettier
 */

import { useLocation } from 'react-router-dom';

import { useGetApplicationByUuid } from '@hooks/application';

import { GlobalErrorModal, GlobalLoadingModal } from '@components/notification';
import { ApplicationDetails } from './components/application-details';
import { CommentSection } from './components/comment-section';
import { MainGrid } from './application-view.styles';

import { Application, Location, SimpleQueryResult } from '@common-types';

export const ApplicationView = () => {
  const { state, pathname }: Location = useLocation();
  const applicationUuid: string = pathname.split('/applications/view/')[1];

  const { data, isLoading, isError }: SimpleQueryResult<Application> = useGetApplicationByUuid(state, applicationUuid);

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
        applicationUuid={applicationUuid}
      />
      <CommentSection applicationUuid={applicationUuid} />
    </MainGrid>
  );
};
