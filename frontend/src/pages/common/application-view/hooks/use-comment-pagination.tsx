/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { useState } from 'react';

/**
 * Defines properties for managing paginated label.
 */
interface CommentPagination {
  /**
   * The current page number being displayed.
   */
  readonly currentPage: number;

  /**
   * Decrements the `currentPage` value by one when the "Previous" button is clicked, as long as it is above 0.
   */
  goToPreviousPage: () => void;

  /**
   * Increments the `currentPage` value by one when the "Next" button is clicked,
   * as long as the current page is less than the `totalPages` limit.
   */
  goToNextPage: (totalPages: number) => void;
}

/**
 * Manages the page number tracking for the comment pagination feature.
 *
 * @return {CommentPagination}
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
