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
};

export const getAccountRoleResource = (accountRole: UserRole): string => {
  return roleResources[accountRole];
};
