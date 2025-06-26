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
export type AuthenticationState = {
  account: {
    email: string;
    firstName: string;
    role: UserRole | null;
  };
  authenticationStatus: UserLoginState;
};
