/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* logic imports */
import { joinTw } from '@daigaku/utilities';

/**
 * Defines the component's properties.
 */
interface CoreDisabledInputElementProps {
  /**
   * The input element's id.
   */
  readonly id: string;

  /**
   * The input element's type.
   */
  readonly type: string;

  /**
   * The input element's readonly default value.
   */
  readonly defaultValue: string | number;
}

/**
 * Renders the core disabled input element used throughout the application.
 *
 * @param {CoreDisabledInputElementProps} props
 * @return {JSX.Element}
 */
export const CoreDisabledInputElement = ({ id, type, defaultValue }: CoreDisabledInputElementProps): JSX.Element => {
  return (
    <input
      id={id}
      name={id}
      type={type}
      disabled
      readOnly
      defaultValue={defaultValue}
      className={joinTw(
        'bg-accent border-secondary h-20 w-full cursor-not-allowed rounded-xl border-2 px-4 pt-4 text-xl',
        'focus:outline-solid focus:placeholder:text-secondary-muted focus:outline-secondary focus:outline-1',
        'placeholder:text-secondary-muted',
      )}
    />
  );
};
