/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/**
 * Defines the properties of a single user login form submission.
 */
export interface LoginFormFields {
  readonly email: string;
  readonly password: string;
}

/**
 * Defines the properties of a successful login request.
 */
export interface LoginFormResponse {
  readonly email: string;
  readonly firstName: string;
  readonly jwtToken: string;
  readonly role: string;
}

/**
 * Defines the properties of a single user registration form submission.
 */
export interface RegistrationFormFields {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly institutionUuid: string;
  readonly accountRoleUuid: string;
}

/**
 * Defines the properties of a single user registration form submission.
 */
export interface ResetFormFields {
  readonly email: string;
}
