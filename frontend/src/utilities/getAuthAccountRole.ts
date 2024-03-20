import { AccountRoleE } from '@context/AuthContext.tsx';

type AccountRoleT = {
  [key: string]: AccountRoleE;
}

const getAuthAccountRole = (role: string): AccountRoleE => {
  const roles: AccountRoleT = {
    'ROLE_STUDENT': AccountRoleE.STUDENT,
    'ROLE_MENTOR': AccountRoleE.MENTOR,
    'ROLE_ADMIN': AccountRoleE.ADMIN,
  };

  return roles[role];
};

export default getAuthAccountRole;
