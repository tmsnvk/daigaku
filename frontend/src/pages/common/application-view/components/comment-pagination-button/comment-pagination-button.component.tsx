/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* external imports */
import { JSX } from 'react';

/* component, style imports */
import { PaginationButton } from './comment-pagination-button.styles.ts';

/**
 * ===============
 * Component {@link CommentPaginationButton}
 * ===============
 */

/**
 * Defines the properties of the {@link CommentPaginationButton} component.
 *
 * @since 0.0.1
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
 *
 * @since 0.0.1
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
