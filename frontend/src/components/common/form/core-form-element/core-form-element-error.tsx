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
    <p className={'text-destructive animate-simple-fade-in mt-4 text-center text-lg font-bold tracking-wide'}>
      {message}
    </p>
  );
};
