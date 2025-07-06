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
        'core-tertiary-border animate-fade-in-from-left my-[5%] flex w-[90%] flex-col px-10 py-20 text-center',
        'sm:w-200',
      )}
    >
      {children}
    </section>
  );
};
