/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { ReactNode } from 'react';

/* logic imports */
import { joinTw } from '@daigaku/utilities';

/**
 * Defines the component's properties.
 */
interface ElementGroupWrapperProps {
  /**
   * Additional style options.
   */
  readonly className?: string;

  /**
   * The array of wrapped components.
   */
  readonly children: ReactNode | Array<ReactNode>;
}

/**
 *
 * @param {ElementGroupWrapperProps} props
 * @returns
 */
export const ElementGroupWrapper = ({ className, children }: ElementGroupWrapperProps) => {
  return (
    <article className={joinTw('h-50 relative flex w-[95%] flex-col', 'sm:w-[65%]', className)}>{children}</article>
  );
};
