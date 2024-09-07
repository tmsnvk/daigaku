/**
 * @prettier
 */

/* external imports */
import { useLocation } from 'react-router-dom';

/* logic imports */
import { useGetAllSelectOptions, useGetApplicationByUuid } from '@hooks/index';

/* component, style imports */
import { GlobalErrorModal, GlobalLoadingModal } from '@components/notification';
import { MainGrid } from './application-edit.styles';
import { ApplicationForm } from './components/application-form';

/* interface, type, enum imports */
import { Application, Location, SimpleQueryResult } from '@common-types';
import { ApplicationOptions } from '@hooks/application-status/use-get-all-select-options';

/*
 * component - TODO - add functionality description
 */
export const ApplicationEdit = () => {
  const { state, pathname }: Location = useLocation();
  const applicationUuid: string = pathname.split('/applications/edit/')[1];
  const { selectOptions, isLoading: isOptionsLoading, isError: isOptionsError }: ApplicationOptions = useGetAllSelectOptions();
  const {
    data,
    isLoading: isApplicationLoading,
    isError: isApplicationError,
  }: SimpleQueryResult<Application> = useGetApplicationByUuid(state, applicationUuid);
  const application: Application = state || data;

  if (isOptionsLoading || isApplicationLoading) {
    return <GlobalLoadingModal loadingText={'The application is compiling your data...'} />;
  }

  if (isOptionsError || isApplicationError) {
    return <GlobalErrorModal />;
  }

  return (
    <MainGrid>
      <ApplicationForm
        application={application}
        selectOptions={selectOptions}
      />
    </MainGrid>
  );
};
