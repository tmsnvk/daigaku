/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

/* external imports */
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

/* logic imports */
import { commentService } from '@services/index';

/* configuration, utilities, constants imports */
import { queryKeys } from '@configuration';

/* interface, type, enum imports */
import { CommentPaginationData, SimpleQueryResult } from '@common-types';

/**
 * ===============
 * Custom Hook {@link useCommentPagination}
 * ===============
 */

/**
 * Defines the return value properties of the {@link useCommentPagination} custom hook.
 *
 * @since 0.0.1
 */
export interface CommentPagination {
  /**
   * The current page number being displayed.
   */
  currentPage: number;

  /**
   * Decrements the `currentPage` value by one when the "Previous" button is clicked, as long as it is above 0.
   */
  goToPreviousPage: () => void;

  /**
   * Increments the `currentPage` value by one when the "Next" button is clicked, as long as the current page is less than the `totalPages` limit.
   */
  goToNextPage: (totalPages: number) => void;
}

/**
 * Manages page number tracking for the comment pagination feature.
 *
 * @return {CommentPagination}
 *
 * @since 0.0.1
 */
export const useCommentPagination = (): CommentPagination => {
  // Holds the current page number in the pagination flow.
  const [currentPage, setCurrentPage] = useState<number>(0);

  // Decreases the page number by 1, staying within bounds.
  const goToPreviousPage = (): void => {
    if (currentPage >= 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Increases the page number by 1, limited by the total number of pages.
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
 * ===============
 * Custom Hook {@link useCommentsByApplicationAndPagination}
 * ===============
 */

/**
 * Manages fetching comments for a specific {@link Application} based on the selected page number in the pagination list.
 * Utilizes the `react-query` library for data fetching and caching.
 *
 * @param applicationUuid The selected application's uuid.
 * @param currentPage The current page number in the pagination sequence.
 * @return {SimpleQueryResult<CommentPaginationData>}
 *
 * @since 0.0.1
 */
export const useCommentsByApplicationAndPagination = (
  applicationUuid: string,
  currentPage: number,
): SimpleQueryResult<CommentPaginationData> => {
  return useQuery({
    queryKey: [queryKeys.comments.GET_ALL_BY_APPLICATION_UUID_AND_PAGINATION, applicationUuid, currentPage],
    queryFn: () => commentService.getAllByApplicationUuidAndPagination(applicationUuid, currentPage),
  });
};
