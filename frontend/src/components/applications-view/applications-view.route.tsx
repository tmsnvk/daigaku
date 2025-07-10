/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* component imports */
import { joinTw } from '@daigaku/utilities';
import { ApplicationDetails } from './application-details';
import { CommentSection } from './comment-section';

/* interface, type imports */
import { Application, ApplicationCommentPaginationDataResponse } from '@daigaku/common-types';

/**
 *
 */
interface ApplicationsViewProps {
  /**
   *
   */
  readonly application: Application;

  /**
   *
   */
  readonly comments: ApplicationCommentPaginationDataResponse;
}

/**
 *
 * @returns {JSX.Element}
 */
export const ApplicationsView = ({ application, comments }: ApplicationsViewProps): JSX.Element => {
  return (
    <main className={joinTw('grid grid-cols-[1fr] gap-x-10', 'lg:grid-cols-[1fr_0.5fr]')}>
      <ApplicationDetails application={application} />
      <CommentSection
        applicationUuid={application.uuid}
        comments={comments}
      />
    </main>
  );
};
