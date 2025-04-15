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
interface CoreFormWrapperProps {
  /**
   * The form element's id.
   */
  readonly formId: string;

  /**
   * The form element's submission handler.
   */
  onFormSubmit: () => void;

  /**
   * The passed down React child component(s).
   */
  readonly children: ReactNode;

  /**
   * Optional style settings.
   */
  readonly className?: string;
}

/**
 * Renders a form element component, wrapping around the form's other components.
 *
 * @param {CoreFormWrapperProps}
 * @returns {JSX.Element}
 */
export const CoreFormWrapper = ({ formId, onFormSubmit, className, children }: CoreFormWrapperProps): JSX.Element => {
  return (
    <form
      id={formId}
      onSubmit={onFormSubmit}
      className={className}
    >
      {children}
    </form>
  );
};
