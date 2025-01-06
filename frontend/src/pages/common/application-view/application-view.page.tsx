/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { useLocation } from 'react-router-dom';

/* logic imports */
import { useGetApplicationByUuid } from '@hooks';

/* component, style imports */
import { GlobalErrorModal, GlobalLoadingModal } from '@components/notification';
import { Main } from './application-view.styles';
import { ApplicationDetails } from './components/application-details';
import { CommentSection } from './components/comment-section';

/* configuration, utilities, constants imports */
import { constants } from './application-view.constants';

/**
 * Renders the view mode of the selected Application record.
 *
 * @return {JSX.Element}
 */
export const ApplicationView = (): JSX.Element => {
  const { state, pathname } = useLocation();
  const applicationUuid = pathname.split('/applications/view/')[1];
  const { data, isLoading, isError } = useGetApplicationByUuid(state, applicationUuid);
  const application = state || data;

  if (isLoading) {
    return (
      <GlobalLoadingModal
        isVisible={isLoading}
        loadingText={constants.ui.LOADING}
      />
    );
  }

  if (isError) {
    return (
      <GlobalErrorModal
        isVisible={isError}
        onCloseModal={() => console.log('FIX ME')}
      />
    );
  }

  return (
    <Main>
      <ApplicationDetails application={application} />
      <CommentSection applicationUuid={applicationUuid} />
    </Main>
  );
};
