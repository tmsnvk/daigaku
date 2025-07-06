/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* interface, type imports */
import { UserRole } from '../role/roles';

/**
 * Defines the structure of a user login form submission.
 */
export interface LoginPayload {
  /**
   * The email address used during the login event.
   */
  readonly email: string;

  /**
   * The password used during the login event.
   */
  readonly password: string;
}

/**
 * Defines the structure of the successful login response.
 */
export interface LoginResponse {
  /**
   * The authenticated user's email.
   */
  readonly email: string;

  /**
   * The authenticated user's first name.
   */
  readonly firstName: string;

  /**
   * The session's JWT token.
   */
  readonly jwtToken: string;

  /**
   * The authenticated user's authorization level.
   */
  readonly role: UserRole;
}

/**
 * Defines the structure of a user registration form submission.
 */
export interface CreatePendingAccountPayload {
  /**
   * The first name used during the registration event.
   */
  readonly firstName: string;

  /**
   * The last name used during the registration event.
   */
  readonly lastName: string;

  /**
   * The email used during the registration event.
   */
  readonly email: string;

  /**
   * The uuid of the institution selected as part of the registration event.
   */
  readonly institutionUuid: string;

  /**
   * The uuid of the account role selected as part of the registration event.
   */
  readonly accountRoleUuid: string;
}

/**
 * Defines the structure of a user reset form submission.
 */
export interface AccountPasswordResetPayload {
  /**
   * The email of the to-be-reset account.
   */
  readonly email: string;
}
