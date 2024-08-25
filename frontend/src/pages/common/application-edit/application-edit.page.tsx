/**
 * @prettier
 */

import { useLocation } from 'react-router-dom';

import { useGetAllSelectOptions } from '@hooks/application-status';
import { useGetApplication } from '@hooks/application';

import { GlobalErrorModal, GlobalLoadingModal } from '@components/notification';
import { ApplicationForm } from './components/application-form';
import { MainGrid } from './application-edit.styles';

import { Application } from '@custom-types/index';
import { ApplicationOptionsData } from '@hooks/application-status/use-get-all-select-options';

interface Location {
  readonly state: Application;
  readonly pathname: string;
}

export const ApplicationEdit = () => {
  const { state, pathname } = useLocation() as Location;
  const applicationUuid: string = pathname.split('/applications/edit/')[1];

  const { selectOptions, isLoading: isOptionsLoading, isError: isOptionsError }: ApplicationOptionsData = useGetAllSelectOptions();
  const { data, isLoading: isApplicationLoading, isError: isApplicationError } = useGetApplication(state, applicationUuid);

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
