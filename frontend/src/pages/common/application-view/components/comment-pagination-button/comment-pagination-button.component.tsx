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

/* component, style imports */
import { PaginationButton } from './comment-pagination-button.styles.ts';

/**
 * ===============
 * Component {@link CommentPaginationButton}
 * ===============
 */

/**
 * The interface represents the properties of the {@link CommentPaginationButton} component.
 *
 * @since 0.0.1
 */
interface ComponentProps {
  readonly onClick: () => void;
  readonly isDisabled: boolean;
  readonly value: string;
}

/**
 * The component renders a single button HTML element for paginating the comments under a selected {@link ApplicationView} page.
 *
 * @param {ComponentProps} props
 * @param props.onClick The onClick event handler.
 * @param props.isDisabled Boolean value for controlling the button's disabled status,
 * i.e. if the user views the first or last page, they are not able to paginate further.
 * @param props.content The name of the button.
 *
 * @returns {JSX.Element}
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
