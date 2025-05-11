/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* configuration, utilities, constants imports */
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

  /**
   * Additional optional styling options.
   */
  readonly className?: string;
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
        'h-20 w-full',
        'px-4 pt-4',
        'bg-accent border-secondary border-2',
        'text-xl',
        'cursor-not-allowed rounded-xl',
        "[&[type='number']]:w-20 [&[type='number']]:p-0 [&[type='number']]:text-center",
        'focus:outline-solid focus:placeholder:text-secondary-muted focus:outline-secondary focus:outline-1',
        'placeholder:text-secondary-muted',
      )}
    />
  );
};
