/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { useLocation } from 'react-router-dom';

/* logic imports */
import { useGetAllSelectOptions, useGetApplicationByUuid } from '@daigaku/hooks';

/* component imports */
import { GlobalErrorModal, LoadingModal } from '@daigaku/components/notification';
import { ApplicationForm } from './components';

/* configuration, utilities, constants imports */
import { errorConstants, localization as l } from '@daigaku/constants';

/**
 * Renders the edit mode of a single application record.
 * The user is not allowed to change the basic elements of the application,
 * i.e. the Country, University Course Name, Minor Subject and Programme Length fields.
 * The rest of the fields may be updated based on conditional validation rules.
 * The user is guided by either not being able to select certain fields or various error messages.
 *
 * @return {JSX.Element}
 */
export const ApplicationEdit = (): JSX.Element => {
  const { state, pathname } = useLocation();
  const applicationUuid = pathname.split('/applications/edit/')[1];
  const { selectOptions, isLoading: isOptionsLoading, isError: isOptionsError } = useGetAllSelectOptions();
  const {
    data,
    isLoading: isApplicationLoading,
    isError: isApplicationError,
  } = useGetApplicationByUuid(state, applicationUuid);
  const application = state || data;

  if (isOptionsLoading || isApplicationLoading) {
    return (
      <LoadingModal
        isVisible={isApplicationLoading}
        status={l.PAGES.COMMON.APPLICATION_EDIT.NOTIFICATIONS.PAGE_LOADING}
      />
    );
  }

  if (isOptionsError || isApplicationError) {
    return (
      <GlobalErrorModal
        isVisible={isOptionsError || isApplicationError}
        errorText={errorConstants.UNEXPECTED_GLOBAL_ERROR}
        onCloseModal={() => console.log('FIX ME')}
      />
    );
  }

  return (
    <main className={'mx-auto flex flex-col items-center'}>
      <ApplicationForm
        application={application}
        selectOptions={selectOptions}
      />
    </main>
  );
};
