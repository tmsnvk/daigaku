/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { createFileRoute, useLocation } from '@tanstack/react-router';
import { JSX } from 'react';

/* logic imports */
import { useGetApplicationByUuid } from '@daigaku/hooks';

/* component imports */
import { ApplicationDetails, CommentSection } from '@daigaku/components/applications-view';
import { CoreLoadingNotification } from '@daigaku/components/core';
import { GlobalErrorModal } from '@daigaku/components/notification';

/**
 *
 * @returns {JSX.Element}
 */
const ApplicationViewComponent = (): JSX.Element => {
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
    <main className={'grid grid-cols-[1fr] gap-x-10 lg:grid-cols-[1fr_0.5fr]'}>
      <ApplicationDetails application={application} />
      <CommentSection applicationUuid={applicationUuid} />
    </main>
  );
};

export const Route = createFileRoute('/applications/view/$applicationId')({
  component: ApplicationViewComponent,
});
