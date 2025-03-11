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
interface ComponentProps {
  children: ReactNode;
}

/**
 * Renders a wrapper component for the dashboard page's layout sections.
 *
 * @param {ComponentProps}
 * @returns {JSX.Element}
 */
export const LayoutSectionWrapper = ({ children }: ComponentProps): JSX.Element => {
  return (
    <section className={'w-full flex flex-row flex-wrap flex-[1 100vw] gap-[5rem] justify-center lg:justify-start'}>{children}</section>
  );
};
