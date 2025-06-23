/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* interface, type imports */
import { UserLoginState, UserRole } from '@daigaku/common-types';

/**
 * Defines the properties of the data associated with the logged-in user.
 */
interface Account {
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
