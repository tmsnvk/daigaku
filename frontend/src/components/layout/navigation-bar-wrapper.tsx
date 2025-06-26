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
interface NavigationBarWrapperProps {
  children: ReactNode;
}

/**
 * Renders the application's navigation header element.
 *
 * @param {NavigationBarWrapperProps}
 * @return {JSX.Element}
 */
export const NavigationBarWrapper = ({ children }: NavigationBarWrapperProps): JSX.Element => {
  return (
    <header className={joinTw('z-100 sticky top-0', 'bg-primary border-secondary border-b-2')}>
      <nav className={joinTw('flex items-center justify-between lg:justify-around', 'w-9/10 h-40', 'mx-auto')}>
        {children}
      </nav>
    </header>
  );
};
