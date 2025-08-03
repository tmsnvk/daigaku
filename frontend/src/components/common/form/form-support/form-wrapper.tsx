/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX, ReactNode } from 'react';

/* logic imports */
import { joinTw } from '@daigaku/utilities';

/**
 * Defines the component's properties.
 */
interface FormWrapperProps {
  /**
   * The form element's id.
   */
  readonly formId: string;

  /**
   * The passed down React child component(s).
   */
  readonly children: ReactNode;

  /**
   * Optional style settings.
   */
  readonly className?: string;

  /**
   * The form element's submission handler.
   */
  onFormSubmit: () => void;
}

/**
 * Renders a form element component, wrapping around the form's other components.
 *
 * @param {FormWrapperProps}
 * @returns {JSX.Element}
 */
export const FormWrapper = ({ formId, onFormSubmit, className, children }: FormWrapperProps): JSX.Element => {
  return (
    <form
      className={joinTw('flex flex-col items-center', className)}
      id={formId}
      onSubmit={onFormSubmit}
    >
      {children}
    </form>
  );
};
