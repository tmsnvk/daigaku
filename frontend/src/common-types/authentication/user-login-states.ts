/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/**
 * Defines user login states.
 */
export const UserLoginStates = {
  LOADING: 'LOADING',
  LOGGED_IN: 'LOGGED_IN',
  LOGGED_OUT: 'LOGGED_OUT',
} as const;

export type UserLoginState = (typeof UserLoginStates)[keyof typeof UserLoginStates];
