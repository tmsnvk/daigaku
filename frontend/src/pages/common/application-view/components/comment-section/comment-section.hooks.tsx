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
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

/* logic imports */
import { commentService } from '@services/index';

/* configuration, utilities, constants imports */
import { queryKeys } from '@configuration';

/* interface, type, enum imports */
import { CommentPagination, SimpleQueryResult } from '@common-types';

/**
 * ===============
 * Custom Hook {@link useCommentPagination}
 * ===============
 */

/**
 * The interface represents the return value properties of the {@link useCommentPagination} custom hook.
 *
 * @since 0.0.1
 */
export interface CommentPagination {
  currentPage: number;
  goToPreviousPage: () => void;
  goToNextPage: (totalPages: number) => void;
}

/**
 * The custom hook manages the page number tracking of the comment pagination feature.
 *
 * @returns {CommentPagination} An object with the following values:
 * - `currentPage` - the current page number.
 * - `goToPreviousPage` - a method that updates the `currentPage` value when the paginating backwards button is clicked.
 * - `goToNextPage`- a method that updates the `currentPage` value when the paginating forwards button is clicked.
 *
 * @since 0.0.1
 */
export const useCommentPagination = (): CommentPagination => {
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
 * ===============
 * Custom Hook {@link useCommentsByApplicationAndPagination}
 * ===============
 */

/**
 * The custom hook manages the fetching of comments for a given application
 * that belong to the selected page number in the pagination list, utilising the `react-query` library.
 *
 * @param applicationUuid The selected application's UUID.
 * @param currentPage The current page number for pagination.
 *
 * @returns {SimpleQueryResult<CommentPagination>}
 *
 * @since 0.0.1
 */
export const useCommentsByApplicationAndPagination = (
  applicationUuid: string,
  currentPage: number,
): SimpleQueryResult<CommentPagination> => {
  return useQuery({
    queryKey: [queryKeys.comments.GET_ALL_BY_APPLICATION_UUID_AND_PAGINATION, applicationUuid, currentPage],
    queryFn: () => commentService.getAllByApplicationUUidAndPagination(applicationUuid, currentPage),
  });
};
