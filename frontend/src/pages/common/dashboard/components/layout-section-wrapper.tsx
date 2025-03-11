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
  return <section className={'w-full flex flex-row flex-wrap flex-[1 100vw] gap-10 justify-center lg:justify-start'}>{children}</section>;
};
