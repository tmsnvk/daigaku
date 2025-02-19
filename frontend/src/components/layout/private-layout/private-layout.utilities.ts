/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* configuration, utilities, constants imports */
import { iconLibraryConfig } from '@configuration';
import { localization as l } from '@constants';

/* interface, type, enum imports */
import { AccountRoles } from '@context/auth';
import { NavbarRoute } from './private-layout.models';

/**
 * Defines navigation routes based on the authorisation role.
 */
export const accountRoleNavigationRoutes: { [key in AccountRoles]: Array<NavbarRoute> } = {
  [AccountRoles.ROLE_STUDENT]: [
    {
      url: '/new-application',
      icon: iconLibraryConfig.faFileCirclePlus,
      label: l.LAYOUT.PRIVATE_LAYOUT.ROUTES.STUDENT.NEW_APPLICATION.LABEL,
    },
    {
      url: '/applications',
      icon: iconLibraryConfig.faScroll,
      label: l.LAYOUT.PRIVATE_LAYOUT.ROUTES.STUDENT.MY_APPLICATIONS.LABEL,
    },
  ],
  [AccountRoles.ROLE_MENTOR]: [
    {
      url: '/my-students',
      icon: iconLibraryConfig.faUserGroup,
      label: l.LAYOUT.PRIVATE_LAYOUT.ROUTES.MENTOR.MY_STUDENTS.LABEL,
    },
    {
      url: '/applications',
      icon: iconLibraryConfig.faScroll,
      label: l.LAYOUT.PRIVATE_LAYOUT.ROUTES.MENTOR.MY_STUDENT_APPLICATIONS.LABEL,
    },
  ],
  [AccountRoles.ROLE_INSTITUTION_ADMIN]: [],
  [AccountRoles.ROLE_SYSTEM_ADMIN]: [
    {
      url: '/all-students',
      icon: iconLibraryConfig.faUserGroup,
      label: l.LAYOUT.PRIVATE_LAYOUT.ROUTES.SYSTEM_ADMIN.ALL_STUDENTS.LABEL,
    },
    {
      url: '/all-mentors',
      icon: iconLibraryConfig.faUserGroup,
      label: l.LAYOUT.PRIVATE_LAYOUT.ROUTES.SYSTEM_ADMIN.ALL_MENTORS.LABEL,
    },
    {
      url: '/applications',
      icon: iconLibraryConfig.faScroll,
      label: l.LAYOUT.PRIVATE_LAYOUT.ROUTES.SYSTEM_ADMIN.ALL_APPLICATIONS.LABEL,
    },
    {
      url: '/system',
      icon: iconLibraryConfig.faGears,
      label: l.LAYOUT.PRIVATE_LAYOUT.ROUTES.SYSTEM_ADMIN.SYSTEM.LABEL,
    },
  ],
};

/**
 * Defines shared navigation routes accessible to all authenticated users.
 */
export const sharedNavigationRoutes: Array<NavbarRoute> = [
  { url: '/account', icon: iconLibraryConfig.faUser, label: l.LAYOUT.PRIVATE_LAYOUT.ROUTES.SHARED.MY_ACCOUNT.LABEL },
  { url: '/messages', icon: iconLibraryConfig.faEnvelope, label: l.LAYOUT.PRIVATE_LAYOUT.ROUTES.SHARED.MESSAGES.LABEL },
  { url: '/feedback', icon: iconLibraryConfig.faGears, label: l.LAYOUT.PRIVATE_LAYOUT.ROUTES.SHARED.FEEDBACK.LABEL },
];
