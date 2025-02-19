/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

/* logic imports */
import { commentService } from '@services';

/* configuration, utilities, constants imports */
import { queryKeys } from '@configuration';

/* interface, type, enum imports */
import { CommentPaginationData, SimpleQueryResult } from '@common-types';
import { CommentPagination } from './comment-section.models';

/**
 * Manages page number tracking for the comment pagination feature.
 *
 * @return {CommentPagination}
 */
export const useHandleCommentPagination = (): CommentPagination => {
  const [currentPage, setCurrentPage] = useState<number>(0);

  const goToPreviousPage = (): void => {
    if (currentPage >= 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = (totalPages: number): void => {
    if (totalPages > 0 && currentPage + 1 < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return {
    currentPage,
    goToPreviousPage,
    goToNextPage,
  };
};

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
