import { IconLookup } from '@fortawesome/fontawesome-svg-core';

import { AccountRoleE } from '@context/AuthContext.tsx';

import { iconLibraryConfig } from '@configuration';

export type NavbarRoutesT = {
  url: string;
  icon: IconLookup;
  content: string;
}

const roleNavigationRoutes: { [key in AccountRoleE]: NavbarRoutesT[] } = {
  [AccountRoleE.STUDENT]: [
    { url: '/new-application', icon: iconLibraryConfig.faFileCirclePlus, content: 'New Application' },
    { url: '/applications', icon: iconLibraryConfig.faScroll, content: 'My Applications' },
  ],
  [AccountRoleE.MENTOR]: [
    { url: '/my-students', icon: iconLibraryConfig.faUserGroup, content: 'My Students' },
    { url: '/applications', icon: iconLibraryConfig.faScroll, content: 'My Student Applications' },
  ],
  [AccountRoleE.INSTITUTION_ADMIN]: [
  ],
  [AccountRoleE.SYSTEM_ADMIN]: [
    { url: '/all-students', icon: iconLibraryConfig.faUserGroup, content: 'All Students' },
    { url: '/all-mentors', icon: iconLibraryConfig.faUserGroup, content: 'All Mentors' },
    { url: '/applications', icon: iconLibraryConfig.faScroll, content: 'All Applications' },
    { url: '/system', icon: iconLibraryConfig.faGears, content: 'System' },
  ],
};

const commonNavigationRoutes: NavbarRoutesT[] = [
  { url: '/account', icon: iconLibraryConfig.faUser, content: 'My Account' },
  { url: '/messages', icon: iconLibraryConfig.faEnvelope, content: 'Messages' },
  { url: '/feedback', icon: iconLibraryConfig.faGears, content: 'Feedback' },
];

export {
  roleNavigationRoutes,
  commonNavigationRoutes,
};
