/**
 * @prettier
 */

/* external imports */
import { IconLookup } from '@fortawesome/fontawesome-svg-core';

/* interface, type, enum imports */
import { AccountRoleValues } from '@context/auth';

/* configuration imports */
import { iconLibraryConfig } from '@configuration';

/* interfaces, types, enums */
export interface NavbarRoute {
  readonly url: string;
  readonly icon: IconLookup;
  readonly content: string;
}

export const navigationRoutesByRole: { [key in AccountRoleValues]: Array<NavbarRoute> } = {
  [AccountRoleValues.STUDENT]: [
    { url: '/new-application', icon: iconLibraryConfig.faFileCirclePlus, content: 'New Application' },
    { url: '/applications', icon: iconLibraryConfig.faScroll, content: 'My Applications' },
  ],
  [AccountRoleValues.MENTOR]: [
    { url: '/my-students', icon: iconLibraryConfig.faUserGroup, content: 'My Students' },
    { url: '/applications', icon: iconLibraryConfig.faScroll, content: 'My Student Applications' },
  ],
  [AccountRoleValues.INSTITUTION_ADMIN]: [],
  [AccountRoleValues.SYSTEM_ADMIN]: [
    { url: '/all-students', icon: iconLibraryConfig.faUserGroup, content: 'All Students' },
    { url: '/all-mentors', icon: iconLibraryConfig.faUserGroup, content: 'All Mentors' },
    { url: '/applications', icon: iconLibraryConfig.faScroll, content: 'All Applications' },
    { url: '/system', icon: iconLibraryConfig.faGears, content: 'System' },
  ],
};

export const sharedNavigationRoutes: Array<NavbarRoute> = [
  { url: '/account', icon: iconLibraryConfig.faUser, content: 'My Account' },
  { url: '/messages', icon: iconLibraryConfig.faEnvelope, content: 'Messages' },
  { url: '/feedback', icon: iconLibraryConfig.faGears, content: 'Feedback' },
];
