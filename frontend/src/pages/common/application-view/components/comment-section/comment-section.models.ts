/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/**
 * Defines properties for managing paginated content.
 */
export interface CommentPagination {
  /**
   * The current page number being displayed.
   */
  currentPage: number;

  /**
   * Decrements the `currentPage` value by one when the "Previous" button is clicked,
   * as long as it is above 0.
   */
  goToPreviousPage: () => void;

  /**
   * Increments the `currentPage` value by one when the "Next" button is clicked,
   * as long as the current page is less than the `totalPages` limit.
   */
  goToNextPage: (totalPages: number) => void;
}
