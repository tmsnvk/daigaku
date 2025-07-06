/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* interface, type imports */
import { UserRole, UserRoles } from '@daigaku/common-types';

const roleResources: Record<UserRole, string> = {
  [UserRoles.ROLE_STUDENT]: 'student',
  [UserRoles.ROLE_MENTOR]: 'mentor',
  [UserRoles.ROLE_INSTITUTION_ADMIN]: 'institution-admin',
  [UserRoles.ROLE_SYSTEM_ADMIN]: 'system-admin',
};

export const getAccountRoleResource = (accountRole: UserRole): string => {
  return roleResources[accountRole];
};
