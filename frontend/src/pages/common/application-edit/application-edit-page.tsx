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
import { UpdateApplicationRecordForm } from './components';
import { GlobalErrorModal, LoadingModal } from '@daigaku/components/notification';

/* configuration, utilities, constants imports */
import { joinTw } from '@daigaku/utilities';
import { errorConstants, localization as l } from '@daigaku/constants';

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
  const { state, pathname } = useLocation();
  const applicationUuid = pathname.split('/applications/edit/')[1];
  const {
    data,
    isLoading: isApplicationLoading,
    isError: isApplicationError,
  } = useGetApplicationByUuid(state, applicationUuid);
  const application = state || data;

  if (isApplicationLoading) {
    return (
      <LoadingModal
        isVisible={isApplicationLoading}
        status={l.PAGES.COMMON.APPLICATION_EDIT.NOTIFICATIONS.PAGE_LOADING}
      />
    );
  }

  if (isApplicationError) {
    return (
      <GlobalErrorModal
        isVisible={isApplicationError}
        errorText={errorConstants.UNEXPECTED_GLOBAL_ERROR}
        onCloseModal={() => console.log('FIX ME')}
      />
    );
  }

  return (
    <main className={joinTw('flex flex-col items-center', 'mx-auto')}>
      <UpdateApplicationRecordForm application={application} />
    </main>
  );
};
