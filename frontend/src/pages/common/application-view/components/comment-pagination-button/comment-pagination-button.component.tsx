/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* component, style imports */
import { PaginationButton } from './comment-pagination-button.styles.ts';

/**
 * Defines the component's properties.
 */
interface ComponentProps {
  /**
   * The onClick event handler for pagination action.
   */
  readonly onClick: () => void;

  /**
   * Controls the button's disabled status. If the user is on the first or last page, pagination is disabled.
   */
  readonly isDisabled: boolean;

  /**
   * The displayed text of the button.
   */
  readonly value: string;
}

/**
 * Renders a single button HTML element for paginating the comments under a selected {@link ApplicationView} page.
 *
 * @param {ComponentProps} props
 * @return {JSX.Element}
 */
export const CommentPaginationButton = ({ onClick, isDisabled, value }: ComponentProps): JSX.Element => {
  return (
    <PaginationButton
      onClick={onClick}
      disabled={isDisabled}
    >
      {value}
    </PaginationButton>
  );
};
