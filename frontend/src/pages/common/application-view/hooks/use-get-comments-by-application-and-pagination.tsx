/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { useQuery } from '@tanstack/react-query';

/* logic imports */
import { commentService } from '@services';

/* configuration, utilities, constants imports */
import { queryKeys } from '@configuration';

/* interface, type, enum imports */
import { CommentPaginationData, SimpleQueryResult } from '@common-types';

/**
 * Manages fetching comments for a specific application record based on the selected page number in the pagination list.
 * Utilizes the `react-query` library for data fetching and caching.
 *
 * @param applicationUuid The selected application record's uuid string.
 * @param currentPage The current page number in the pagination sequence.
 * @return {SimpleQueryResult<CommentPaginationData>}
 */
export const useGetCommentsByApplicationAndPagination = (
  applicationUuid: string,
  currentPage: number,
): SimpleQueryResult<CommentPaginationData> => {
  return useQuery({
    queryKey: [queryKeys.comments.GET_ALL_BY_APPLICATION_UUID_AND_PAGINATION, applicationUuid, currentPage],
    queryFn: () => commentService.getAllByApplicationUuidAndPagination(applicationUuid, currentPage),
  });
};
