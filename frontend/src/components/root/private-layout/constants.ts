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
    label: 'app.layout.navigation.shared.myAccount',
  },
  {
    targetUrlString: '/messages',
    icon: iconLibrary.faEnvelope,
    label: 'app.layout.navigation.shared.messages',
  },
  {
    targetUrlString: '/feedback',
    icon: iconLibrary.faGears,
    label: 'app.layout.navigation.shared.feedback',
  },
];

export const accountRoleNavigationRoutes: {
  [key in UserRole]: Array<NavigationRouteItem>;
} = {
  [UserRoles.ROLE_STUDENT]: [
    {
      targetUrlString: '/applications/student/create',
      icon: iconLibrary.faFileCirclePlus,
      label: 'app.layout.navigation.student.newApplication',
    },
    {
      targetUrlString: '/applications',
      icon: iconLibrary.faScroll,
      label: 'app.layout.navigation.student.myApplications',
    },
  ],
  [UserRoles.ROLE_MENTOR]: [
    {
      targetUrlString: '/my-students',
      icon: iconLibrary.faUserGroup,
      label: 'app.layout.navigation.mentor.myStudents',
    },
    {
      targetUrlString: '/applications',
      icon: iconLibrary.faScroll,
      label: 'app.layout.navigation.mentor.myStudentsApplications',
    },
  ],
};
