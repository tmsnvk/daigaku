/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* component imports */
import { CoreButton } from '@daigaku/components/common/core';

/**
 * Defines the component's properties.
 */
interface CommentPaginationButtonProps {
  /**
   * Controls the button's disabled status. If the user is on the first or last page, the pagination functionality is
   * disabled.
   */
  readonly disabled: boolean;

  /**
   * The displayed text of the button.
   */
  readonly value: string;

  /**
   * The onClick event handler for pagination action.
   */
  onClick: () => void;
}

/**
 * Renders a single button HTML element for paginating comments on an application record's view page.
 *
 * @param {CommentPaginationButtonProps} props
 * @return {JSX.Element}
 */
export const CommentPaginationButton = ({ disabled, value, onClick }: CommentPaginationButtonProps): JSX.Element => {
  return (
    <CoreButton
      disabled={disabled}
      intent={disabled ? 'accent' : 'dark'}
      label={value}
      onClick={onClick}
    />
  );
};
