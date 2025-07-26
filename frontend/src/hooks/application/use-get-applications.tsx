/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseQueryResult } from '@tanstack/react-query';

/* logic imports */
import { CoreApiError } from '@daigaku/errors';
import { applicationStudentService } from '@daigaku/services';
import { useCoreApiQuery } from '../configuration/use-core-api';

/* configuration,, constants imports */
import { queryKeys } from '@daigaku/constants';

/* interface, type imports */
import { Application, ApplicationResponse } from '@daigaku/common-types';

/**
 * Fetches a list of applications based on the user's authorization role.
 *
 * @return {UseQueryResult<Array<ApplicationResponse>, CoreApiError>}
 */
export const useGetApplications = (
  initialApplications: Application[],
): UseQueryResult<Array<ApplicationResponse>, CoreApiError> => {
  return useCoreApiQuery([queryKeys.application.GET_ALL_BY_ROLE], () => applicationStudentService.findAll(), {
    placeholderData: initialApplications,
  });
};
