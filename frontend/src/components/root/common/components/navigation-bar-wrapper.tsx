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
    <header className={'z-100 bg-primary border-secondary sticky top-0 border-b-2'}>
      <nav className={joinTw('justify-betweenw-9/10 mx-auto flex h-40 items-center', 'lg:justify-around')}>
        {children}
      </nav>
    </header>
  );
};
