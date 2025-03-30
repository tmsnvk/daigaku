/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { ReactNode } from 'react';

/**
 * Defines the component's properties.
 */
interface CoreFormElementGroupWrapperProps {
  children: Array<ReactNode>;
}

export const CoreFormElementGroupWrapper = ({ children }: CoreFormElementGroupWrapperProps) => {
  return <article className={'h-50 flex w-full flex-col items-center'}>{children}</article>;
};
