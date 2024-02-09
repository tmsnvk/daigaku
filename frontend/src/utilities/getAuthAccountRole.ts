import { AccountRoleE } from '@context/AuthContext.tsx';

type AccountRoleT = {
  [key: string]: AccountRoleE;
}

const getAuthAccountRole = (role: string): AccountRoleE => {
  const roles: AccountRoleT = {
    'ROLE_STUDENT': AccountRoleE.Student,
    'ROLE_MENTOR': AccountRoleE.Mentor,
    'ROLE_ADMIN': AccountRoleE.Admin,
  };

  return roles[role];
};

export default getAuthAccountRole;
