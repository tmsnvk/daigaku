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
interface CoreModalClosingInputElementProps {
  /**
   *
   */
  readonly value: string;

  /**
   *
   */
  onClick: () => void;
}

/**
 *
 *
 * @param {CoreModalClosingInputElementProps}
 * @return {JSX.Element}
 */
export const CoreModalClosingInputElement = ({ value, onClick }: CoreModalClosingInputElementProps): JSX.Element => {
  return (
    <input
      type={'button'}
      value={value}
      autoFocus={true}
      onClick={onClick}
    ></input>
  );
};
