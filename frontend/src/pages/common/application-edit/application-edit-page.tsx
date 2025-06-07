/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

/* logic imports */
import { useGetApplicationByUuid } from '@daigaku/hooks';

/* component imports */
import { CoreLoadingNotification } from '@daigaku/components/core';
import { GlobalErrorModal } from '@daigaku/components/notification';
import { UpdateApplicationForm } from './update-application-form';

/* configuration, utilities, constants imports */
import { joinTw } from '@daigaku/utilities';

/**
 * Renders the edit mode of a single application record.
 * The user is not allowed to change the basic elements of the application,
 * i.e. the CountryOption, UniversityOption Course Name, Minor Subject and Programme Length fields.
 * The rest of the fields may be updated based on conditional validation rules.
 * The user is guided by either not being able to select certain fields or various error messages.
 *
 * @return {JSX.Element}
 */
export const ApplicationEdit = (): JSX.Element => {
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
