/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/**
 * Defines the component's properties.
 */
interface ComponentProps {
  /**
   * The onClick event handler for pagination action.
   */
  onClick: () => void;

  /**
   * Controls the button's disabled status. If the user is on the first or last page, the pagination functionality is disabled.
   */
  readonly isDisabled: boolean;

  /**
   * The displayed text of the button.
   */
  readonly value: string;
}

/**
 * Renders a single button HTML element for paginating comments on an application record's view page.
 *
 * @param {ComponentProps} props
 * @return {JSX.Element}
 */
export const CommentPaginationButton = ({ onClick, isDisabled, value }: ComponentProps): JSX.Element => {
  return (
    <button
      type={'button'}
      className={
        'base-button text-(--color-white-smoke) bg-(--color-dark-gun-metal) hover:not-disabled:bg-(--color-jacarta) hover:not-disabled:shadow-(--dark-box-shadow) disabled:text-(--color-dark-gun-metal) disabled:bg-(--accent) focus:outline-[0.15rem] focus:outline-solid focus:outline-(--color-jacarta)'
      }
      onClick={onClick}
      disabled={isDisabled}
    >
      {value}
    </button>
  );
};
