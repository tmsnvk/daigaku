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
interface NavigationBarWrapperProps {
  children: ReactNode;
}

/**
 * Renders the application's navigation bar header element.
 *
 * @param {NavigationBarWrapperProps}
 * @return {JSX.Element}
 */
export const NavigationBarWrapper = ({ children }: NavigationBarWrapperProps): JSX.Element => {
  return (
    <header className={'bg-primary border-secondary sticky top-0 z-50 border-b-2'}>
      <nav className={'flex h-40 items-center justify-around'}>{children}</nav>
    </header>
  );
};
