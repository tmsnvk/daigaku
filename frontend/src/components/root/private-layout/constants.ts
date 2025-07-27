/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* configuration, constants imports */
import { iconLibrary } from '@daigaku/constants';

/* interface, type imports */
import { NavigationRouteItem, UserRole, UserRoles } from '@daigaku/common-types';

export const sharedNavigationRoutes: Array<NavigationRouteItem> = [
  {
    targetUrlString: '/account',
    icon: iconLibrary.faUser,
    label: 'application.layout.navigation.shared.myAccount',
  },
  {
    targetUrlString: '/messages',
    icon: iconLibrary.faEnvelope,
    label: 'application.layout.navigation.shared.messages',
  },
  {
    targetUrlString: '/feedback',
    icon: iconLibrary.faGears,
    label: 'application.layout.navigation.shared.feedback',
  },
];

export const accountRoleNavigationRoutes: {
  [key in Exclude<
    UserRole,
    typeof UserRoles.ROLE_INSTITUTION_ADMIN | typeof UserRoles.ROLE_SYSTEM_ADMIN
  >]: Array<NavigationRouteItem>;
} = {
  [UserRoles.ROLE_STUDENT]: [
    {
      targetUrlString: '/applications/student/create',
      icon: iconLibrary.faFileCirclePlus,
      label: 'application.layout.navigation.student.newApplication',
    },
    {
      targetUrlString: '/applications',
      icon: iconLibrary.faScroll,
      label: 'application.layout.navigation.student.myApplications',
    },
  ],
  [UserRoles.ROLE_MENTOR]: [
    {
      targetUrlString: '/my-students',
      icon: iconLibrary.faUserGroup,
      label: 'application.layout.navigation.mentor.myStudents',
    },
    {
      targetUrlString: '/applications',
      icon: iconLibrary.faScroll,
      label: 'application.layout.navigation.mentor.myStudentsApplications',
    },
  ],
};
