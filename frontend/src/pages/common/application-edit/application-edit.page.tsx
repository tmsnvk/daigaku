/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 */

/* external imports */
import { useLocation } from 'react-router-dom';

/* logic imports */
import { useGetAllSelectOptions, useGetApplicationByUuid } from '@hooks/index';

/* component, style imports */
import { GlobalErrorModal, GlobalLoadingModal } from '@components/notification';
import { Main } from './application-edit.styles';
import { ApplicationForm } from './components/application-form';

/* configuration, utilities, constants imports */
import { constants } from './application-edit.constants';

/* interface, type, enum imports */
import { Application, ApplicationLocation, SimpleQueryResult } from '@common-types';
import { UNEXPECTED_GLOBAL_ERROR } from '@constants';
import { ApplicationOptions } from '@hooks/application-status/use-get-all-select-options';

/**
 * ===============
 * Component {@link ApplicationEdit}
 * ===============
 */

/**
 * @description
 * The page-level component renders the edit mode of a single application.
 * The user is not allowed to change the basic elements of the application, i.e. Country, University Course Name, Minor Subject and Programme Length fields.
 * The rest of the fields may be update based on a conditional validation rules.
 * The user is guided by either not being able to select certain fields or by various error messages.
 *
 * @returns {JSX.Element}
 *
 * @since 0.0.1
 */
export const ApplicationEdit = (): JSX.Element => {
  const { state, pathname }: ApplicationLocation = useLocation();
  const applicationUuid: string = pathname.split('/applications/edit/')[1];
  const { selectOptions, isLoading: isOptionsLoading, isError: isOptionsError }: ApplicationOptions = useGetAllSelectOptions();
  const {
    data,
    isLoading: isApplicationLoading,
    isError: isApplicationError,
  }: SimpleQueryResult<Application> = useGetApplicationByUuid(state, applicationUuid);
  const application: Application = state || data;

  if (isOptionsLoading || isApplicationLoading) {
    return (
      <GlobalLoadingModal
        isVisible={isApplicationLoading}
        loadingText={constants.pageMessage.LOADING}
      />
    );
  }

  if (isOptionsError || isApplicationError) {
    return (
      <GlobalErrorModal
        isVisible={isOptionsError || isApplicationError}
        errorText={UNEXPECTED_GLOBAL_ERROR}
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
