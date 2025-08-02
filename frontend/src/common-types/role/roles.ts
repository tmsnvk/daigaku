/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/**
 * Defines user types.
 */
export const UserRoles = {
  ROLE_STUDENT: 'ROLE_STUDENT',
  ROLE_MENTOR: 'ROLE_MENTOR',
} as const;

export type UserRole = (typeof UserRoles)[keyof typeof UserRoles];
