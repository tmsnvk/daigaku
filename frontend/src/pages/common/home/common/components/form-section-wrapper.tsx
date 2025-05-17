/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX, ReactNode } from 'react';

/* configuration, utilities, constants imports */
import { joinTw } from '@daigaku/utilities';

/**
 * Defines the component's properties.
 */
interface FormSectionWrapperProps {
  children: ReactNode;
}

/**
 * Renders the home page's form elements' wrapper.
 *
 * @param {FormSectionWrapperProps} props
 * @return {JSX.Element}
 */
export const FormSectionWrapper = ({ children }: FormSectionWrapperProps): JSX.Element => {
  return (
    <section
      className={joinTw(
        'core-tertiary-border',
        'flex flex-col text-center',
        'sm:w-200 w-[90%]',
        'my-[5%] px-10 py-20',
        'animate-fade-in-from-left',
      )}
    >
      {children}
    </section>
  );
};
