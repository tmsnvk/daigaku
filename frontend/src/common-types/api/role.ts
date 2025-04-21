/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/**
 * Defines the properties of a user role.
 */
export interface RoleOption {
  /**
   * The role's uuid.
   */
  readonly uuid: string;

  /**
   * The role's name.
   */
  readonly name: string;
}

/**
 * Defines user types.
 */
export enum UserRole {
  ROLE_STUDENT = 'ROLE_STUDENT',
  ROLE_MENTOR = 'ROLE_MENTOR',
  ROLE_INSTITUTION_ADMIN = 'ROLE_INSTITUTION_ADMIN',
  ROLE_SYSTEM_ADMIN = 'ROLE_SYSTEM_ADMIN',
}
