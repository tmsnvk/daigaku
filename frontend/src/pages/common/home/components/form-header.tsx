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
interface FormHeaderProps {
  /**
   * The displayed form header text.
   */
  readonly headerContent: string;
}

/**
 * Renders the header text of the given form component.
 *
 * @param {FormHeaderProps} props
 * @return {JSX.Element}
 */
export const FormHeader = ({ headerContent }: FormHeaderProps): JSX.Element => {
  return <p className={'mb-15 text-2xl'}>{headerContent}</p>;
};
