/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* component, style imports */

/**
 * Defines the component's properties.
 */
interface ComponentProps {
  /**
   * The header text to be displayed.
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
  return <p className={'mb-[2.5rem] text-xl'}>{headerContent}</p>;
};
