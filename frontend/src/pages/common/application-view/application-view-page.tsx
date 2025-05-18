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
import { CoreLoadingNotification } from '@daigaku/components/core';
import { GlobalErrorModal } from '@daigaku/components/notification';
import { ApplicationDetails } from './application-details';
import { CommentSection } from './comment-section';

/* configuration, utilities, constants imports */
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
    return <CoreLoadingNotification intent={'light'} />;
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
