/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX, ReactNode } from 'react';

/**
 * Defines the component's properties.
 */
interface FormWrapperProps {
  /**
   * The form's id.
   */
  readonly formId: string;

  /**
   * The form submission handler.
   */
  submissionHandler: () => void;

  /**
   * The passed down React child component(s).
   */
  children: ReactNode;
}

/**
 * Renders a <form> element component, wrapping around the form's other components.
 *
 * @param {FormWrapperProps}
 * @returns {JSX.Element}
 */
export const FormWrapper = ({ formId, submissionHandler, children }: FormWrapperProps): JSX.Element => {
  return (
    <form
      id={formId}
      className={'flex flex-col items-center'}
      onSubmit={submissionHandler}
    >
      {children}
    </form>
  );
};
