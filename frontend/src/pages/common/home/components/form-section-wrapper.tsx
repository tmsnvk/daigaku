/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX, ReactNode } from 'react';

/* configuration, utilities, constants imports */
import { joinTw } from '@utilities';

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
      className={joinTw('base-tertiary-border animate-fade-in-from-left sm:w-200 my-[5%] flex w-[90%] flex-col px-10 py-20 text-center')}
    >
      {children}
    </section>
  );
};
