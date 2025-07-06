/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* interface, type imports */
import { UserLoginState, UserRole } from '@daigaku/common-types';

/**
 *
 */
export interface Account {
  email: string;
  firstName: string;
  role: UserRole | null;
}
/**
 *
 */
export type AuthenticationState = {
  account: Account;
  authenticationStatus: UserLoginState;
};
