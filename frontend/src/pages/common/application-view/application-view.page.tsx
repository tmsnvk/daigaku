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
import { useGetApplicationByUuid } from '@hooks/application';

/* component, style imports */
import { GlobalErrorModal, GlobalLoadingModal } from '@components/notification';
import { Main } from './application-view.styles';
import { ApplicationDetails } from './components/application-details';
import { CommentSection } from './components/comment-section';

/* interface, type, enum imports */
import { Application, Location, SimpleQueryResult } from '@common-types';

/**
 * ===============
 * Component {@link ApplicationView}
 * ===============
 */

/**
 * @description
 * The page-level component renders the view mode of a single application.
 * In a future feature, other users will also be able to view these applications.
 *
 * @returns {JSX.Element}
 *
 * @since 0.0.1
 */
export const ApplicationView = (): JSX.Element => {
  const { state, pathname }: Location = useLocation();
  const applicationUuid: string = pathname.split('/applications/view/')[1];
  const { data, isLoading, isError }: SimpleQueryResult<Application> = useGetApplicationByUuid(state, applicationUuid);
  const application: Application = state || data;

  if (isLoading) {
    return (
      <GlobalLoadingModal
        isVisible={isLoading}
        loadingText={'The application is compiling your data...'}
      />
    );
  }

  if (isError) {
    return (
      <GlobalErrorModal
        isVisible={isError}
        errorText={''}
        onCloseModal={() => console.log('FIX ME')}
      />
    );
  }

  return (
    <Main>
      <ApplicationDetails application={application} />
      <CommentSection applicationUuid={applicationUuid} />
    </Main>
  );
};
