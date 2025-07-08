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
interface LayoutSectionWrapperProps {
  children: ReactNode;
}

/**
 * Renders a wrapper component for the dashboard page's layout sections.
 *
 * @param {LayoutSectionWrapperProps}
 * @returns {JSX.Element}
 */
export const LayoutSectionWrapper = ({ children }: LayoutSectionWrapperProps): JSX.Element => {
  return (
    <section
      className={joinTw('flex-[1 100vw] flex w-full flex-row flex-wrap justify-center gap-10', 'lg:justify-start')}
    >
      {children}
    </section>
  );
};
