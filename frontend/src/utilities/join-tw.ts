/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const joinTw = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
