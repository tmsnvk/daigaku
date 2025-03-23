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
   * The form element's id.
   */
  readonly formId: string;

  /**
   * The form element's submission handler.
   */
  onFormSubmitHandler: () => void;

  /**
   * The passed down React child component(s).
   */
  readonly children: ReactNode;
}

/**
 * Renders a <form> element component, wrapping around the form's other components.
 *
 * @param {FormWrapperProps}
 * @returns {JSX.Element}
 */
export const FormWrapper = ({ formId, onFormSubmitHandler, children }: FormWrapperProps): JSX.Element => {
  return (
    <form
      id={formId}
      onSubmit={onFormSubmitHandler}
      className={'flex flex-col justify-evenly'}
    >
      {children}
    </form>
  );
};
