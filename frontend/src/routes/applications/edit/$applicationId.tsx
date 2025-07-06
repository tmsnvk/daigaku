/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { createFileRoute, useLocation } from '@tanstack/react-router';
import { JSX } from 'react';
import { useTranslation } from 'react-i18next';

/* logic imports */
import { useGetApplicationByUuid } from '@daigaku/hooks';
import { joinTw } from '@daigaku/utilities';

/* component imports */
import { UpdateApplicationForm } from '@daigaku/components/applications-edit';
import { CoreLoadingNotification } from '@daigaku/components/core';
import { GlobalErrorModal } from '@daigaku/components/notification';

/**
 *
 * @returns {JSX.Element}
 */
const ApplicationEditComponent = (): JSX.Element => {
  const { t } = useTranslation();
  const { state, pathname } = useLocation();

  const applicationUuid = pathname.split('/applications/edit/')[1];

  const {
    data,
    isLoading: isApplicationLoading,
    isError: isApplicationError,
  } = useGetApplicationByUuid(state, applicationUuid);
  const application = state || data;

  if (isApplicationLoading) {
    return <CoreLoadingNotification intent={'light'} />;
  }

  if (isApplicationError) {
    return (
      <GlobalErrorModal
        isVisible={isApplicationError}
        errorText={t('unexpectedGlobalError')}
        onCloseModal={() => console.log('FIX ME')}
      />
    );
  }

  return (
    <main className={joinTw('flex flex-col items-center', 'mx-auto')}>
      <UpdateApplicationForm application={application} />
    </main>
  );
};

export const Route = createFileRoute('/applications/edit/$applicationId')({
  component: ApplicationEditComponent,
});
