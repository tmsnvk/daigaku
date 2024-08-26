/**
 * @prettier
 */

import { useLocation } from 'react-router-dom';

import { useGetAllSelectOptions, useGetApplicationByUuid } from '@hooks/index';

import { GlobalErrorModal, GlobalLoadingModal } from '@components/notification';
import { ApplicationForm } from './components/application-form';
import { MainGrid } from './application-edit.styles';

import { ApplicationOptions } from '@hooks/application-status/use-get-all-select-options';
import { Application, Location, SimpleQueryResult } from '@common-types';

export const ApplicationEdit = () => {
  const { state, pathname }: Location = useLocation();
  const applicationUuid: string = pathname.split('/applications/edit/')[1];

  const {
    selectOptions,
    isLoading: isOptionsLoading,
    isError: isOptionsError,
  }: ApplicationOptions = useGetAllSelectOptions();
  const {
    data,
    isLoading: isApplicationLoading,
    isError: isApplicationError,
  }: SimpleQueryResult<Application> = useGetApplicationByUuid(state, applicationUuid);

  if (isOptionsLoading || isApplicationLoading) {
    return <GlobalLoadingModal content={'The application is compiling your data...'} />;
  }

  if (isOptionsError || isApplicationError) {
    return <GlobalErrorModal />;
  }

  return (
    <MainGrid>
      <ApplicationForm
        currentApplicationData={(state && state) || (data && data)}
        applicationUuid={applicationUuid}
        selectOptions={selectOptions}
      />
    </MainGrid>
  );
};
