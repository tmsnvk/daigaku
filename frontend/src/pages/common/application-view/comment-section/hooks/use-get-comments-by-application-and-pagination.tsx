/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseQueryResult, useQuery } from '@tanstack/react-query';

/* logic imports */
import { ServerError, UnexpectedError } from '@daigaku/errors';
import { commentService } from '@daigaku/services';

/* configuration, utilities, constants imports */
import { queryKeys } from '@daigaku/configuration';

/* interface, type, enum, schema imports */
import { CommentPaginationDataResponse } from '@daigaku/common-types';

/**
 * Manages fetching comments for a specific application record based on the selected page number in the pagination
 * list. Utilizes the `react-query` library for data fetching and caching.
 *
 * @param applicationUuid The selected application record's uuid string.
 * @param currentPage The current page number in the pagination sequence.
 * @return {UseQueryResult<Array<CommentPaginationDataResponse>, ServerError | UnexpectedError>}
 */
export const useGetCommentsByApplicationAndPagination = (
  applicationUuid: string,
  currentPage: number,
): UseQueryResult<Array<CommentPaginationDataResponse>, ServerError | UnexpectedError> => {
  return useQuery({
    queryKey: [queryKeys.comments.GET_ALL_BY_APPLICATION_UUID_AND_PAGINATION, applicationUuid, currentPage],
    queryFn: () => commentService.getAllByApplicationUuidAndPagination(applicationUuid, currentPage),
  });
};
