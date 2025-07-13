/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { createFileRoute, getRouteApi } from '@tanstack/react-router';
import { JSX } from 'react';

/* logic imports */
import { applicationService, commentService } from '@daigaku/services';

/* component imports */
import { ApplicationsView } from '@daigaku/components/applications-view';

const PATH = '/applications/student/view/$applicationId';
const routeApi = getRouteApi(PATH);

/**
 *
 * @returns {JSX.Element}
 */
const RouteComponent = (): JSX.Element => {
  const { application, comments } = routeApi.useLoaderData();

  return (
    <ApplicationsView
      application={application}
      comments={comments}
    />
  );
};

export const Route = createFileRoute(PATH)({
  component: RouteComponent,
  loader: async ({ params: { applicationId } }) => {
    const application = await applicationService.findOneByUuid(applicationId);
    const comments = await commentService.findPaginatedListByApplicationUuid(applicationId, 1);

    return {
      application,
      comments,
    };
  },
});
