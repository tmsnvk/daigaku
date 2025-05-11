/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { ReactNode } from 'react';

/* configuration, utilities, constants imports */
import { joinTw } from '@daigaku/utilities';

/**
 * Defines the component's properties.
 */
interface CoreFormElementGroupWrapperProps {
  /**
   * Additional style options.
   */
  readonly className?: string;

  /**
   * The array of wrapped components.
   */
  readonly children: ReactNode | Array<ReactNode>;
}

export const CoreFormElementGroupWrapper = ({ className, children }: CoreFormElementGroupWrapperProps) => {
  return (
    <article className={joinTw('just relative flex flex-col', 'h-50 w-[95%] sm:w-[65%]', className)}>
      {children}
    </article>
  );
};
