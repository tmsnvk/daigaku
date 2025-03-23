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
interface CoreInputGroupWrapperProps {
  children: Array<ReactNode>;
}

export const CoreInputGroupWrapper = ({ children }: CoreInputGroupWrapperProps) => {
  return <article className={'h-50 w-full flex flex-col items-center'}>{children}</article>;
};
