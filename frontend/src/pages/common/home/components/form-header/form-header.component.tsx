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
   * The displayed form header text.
   */
  readonly headerContent: string;
}

/**
 * Renders the header text of the given form component.
 *
 * @param {ComponentProps} props
 * @return {JSX.Element}
 */
export const FormHeader = ({ headerContent }: ComponentProps): JSX.Element => {
  return <p className={'mb-[2.5rem] text-2xl'}>{headerContent}</p>;
};
