/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { useLocation } from 'react-router-dom';

/* logic imports */
import { useGetApplicationByUuid } from '@daigaku/hooks';

/* component imports */
import { GlobalErrorModal, LoadingModal } from '@daigaku/components/notification';
import { ApplicationDetails, CommentSection } from './components';

/* configuration, utilities, constants imports */
import { localization as l } from '@daigaku/constants';
import { joinTw } from '@daigaku/utilities';

/**
 * Renders the view mode page of the selected application record.
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
      <LoadingModal
        isVisible={isLoading}
        status={l.PAGES.COMMON.APPLICATION_VIEW.PAGE_LOADING}
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
    <main className={joinTw('grid grid-cols-[1fr] gap-x-10 lg:grid-cols-[1fr_0.5fr]')}>
      <ApplicationDetails application={application} />
      <CommentSection applicationUuid={applicationUuid} />
    </main>
  );
};
