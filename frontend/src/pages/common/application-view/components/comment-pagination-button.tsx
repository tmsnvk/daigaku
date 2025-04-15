/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* component imports */
import { CoreButton } from '@components/index';

/**
 * Defines the component's properties.
 */
interface CommentPaginationButtonProps {
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
 * @param {CommentPaginationButtonProps} props
 * @return {JSX.Element}
 */
export const CommentPaginationButton = ({ onClick, isDisabled, value }: CommentPaginationButtonProps): JSX.Element => {
  return (
    <CoreButton
      onClick={onClick}
      intent={isDisabled ? 'accent' : 'dark'}
      label={value}
      isDisabled={isDisabled}
    />
  );
};
