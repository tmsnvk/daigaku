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
interface CoreFormElementErrorProps {
  /**
   * The input element's error message, if there is any.
   */
  readonly message: string | undefined;
}

/**
 * Renders the error message for the given input group component.
 *
 * @param {CoreFormElementErrorProps} props
 * @return {JSX.Element}
 */
export const CoreFormElementError = ({ message }: CoreFormElementErrorProps): JSX.Element => {
  return (
    <p
      className={joinTw(
        'text-center',
        'mt-2',
        'text-destructive text-lg font-bold tracking-wide',
        'animate-simple-fade-in',
      )}
    >
      {message}
    </p>
  );
};
