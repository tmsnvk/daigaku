/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { ReactNode } from 'react';

/* configuration, utilities, constants imports */
import { joinTw } from '@utilities';

/**
 * Defines the component's properties.
 */
interface CoreFormElementGroupWrapperProps {
  /**
   * Additional style options.
   */
  readonly className?: string;

  /**
   *
   */
  children: Array<ReactNode>;
}

export const CoreFormElementGroupWrapper = ({ className, children }: CoreFormElementGroupWrapperProps) => {
  return <article className={joinTw('h-50 flex w-full flex-col items-center', className)}>{children}</article>;
};
