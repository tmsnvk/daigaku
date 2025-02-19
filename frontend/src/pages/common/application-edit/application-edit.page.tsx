/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { useLocation } from 'react-router-dom';

/* logic imports */
import { useGetAllSelectOptions, useGetApplicationByUuid } from '@hooks';

/* component, style imports */
import { GlobalErrorModal, GlobalLoadingModal } from '@components/notification';
import { Main } from './application-edit.styles';
import { ApplicationForm } from './components/application-form';

/* configuration, utilities, constants imports */
import { errorConstants, localization as l } from '@constants';

/**
 * Renders the edit mode of a single application record.
 * The user is not allowed to change the basic elements of the application,
 * i.e. Country, University Course Name, Minor Subject and Programme Length fields.
 * The rest of the fields may be updated based on conditional validation rules.
 * The user is guided by either not being able to select certain fields or by various error messages.
 *
 * @return {JSX.Element}
 */
export const ApplicationEdit = (): JSX.Element => {
  const { state, pathname } = useLocation();
  const applicationUuid = pathname.split('/applications/edit/')[1];
  const { selectOptions, isLoading: isOptionsLoading, isError: isOptionsError } = useGetAllSelectOptions();
  const { data, isLoading: isApplicationLoading, isError: isApplicationError } = useGetApplicationByUuid(state, applicationUuid);
  const application = state || data;

  if (isOptionsLoading || isApplicationLoading) {
    return (
      <GlobalLoadingModal
        isVisible={isApplicationLoading}
        loadingText={l.PAGES.COMMON.APPLICATION_EDIT.NOTIFICATIONS.PAGE_LOADING}
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
    <Main>
      <ApplicationForm
        application={application}
        selectOptions={selectOptions}
      />
    </Main>
  );
};
