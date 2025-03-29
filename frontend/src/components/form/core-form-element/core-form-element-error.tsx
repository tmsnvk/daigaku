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
  return <p className='mt-2 text-center text-destructive text-lg font-bold animate-simple-fade-in tracking-wide'>{message}</p>;
};
