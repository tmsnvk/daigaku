/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseQueryResult } from '@tanstack/react-query';

/* logic imports */
import { CoreApiError } from '@daigaku/errors';
import { useCoreApiQuery } from '@daigaku/hooks';
import { commentService } from '@daigaku/services';

/* configuration, constants imports */
import { queryKeys } from '@daigaku/constants';

/* interface, type imports */
import { ApplicationCommentPaginationDataResponse } from '@daigaku/common-types';

/**
 * Manages fetching comments for a specific application record based on the selected page number in the pagination
 * list. Utilizes the `react-query` library for data fetching and caching.
 *
 * @param applicationUuid The selected application record's uuid string.
 * @param currentPage The current page number in the pagination sequence.
 * @return {UseQueryResult<ApplicationCommentPaginationDataResponse, CoreApiError>}
 */
export const useGetCommentsByApplicationAndPagination = (
  applicationUuid: string,
  currentPage: number,
): UseQueryResult<ApplicationCommentPaginationDataResponse, CoreApiError> => {
  return useCoreApiQuery(
    [queryKeys.comments.GET_ALL_BY_APPLICATION_UUID_AND_PAGINATION, applicationUuid, currentPage],
    () => commentService.findPaginatedListByApplicationUuid(applicationUuid, currentPage),
  );
};
