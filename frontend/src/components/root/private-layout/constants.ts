/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* configuration, constants imports */
import { TranslationKey, iconLibrary } from '@daigaku/constants';

/* interface, type imports */
import { NavigationRouteItem, UserRole, UserRoles } from '@daigaku/common-types';

export const sharedNavigationRoutes: Array<NavigationRouteItem> = [
  {
    targetUrlString: '/account',
    icon: iconLibrary.faUser,
    label: TranslationKey.MY_ACCOUNT,
  },
  {
    targetUrlString: '/messages',
    icon: iconLibrary.faEnvelope,
    label: TranslationKey.MESSAGES,
  },
  {
    targetUrlString: '/feedback',
    icon: iconLibrary.faGears,
    label: TranslationKey.FEEDBACK,
  },
];

export const accountRoleNavigationRoutes: { [key in UserRole]: Array<NavigationRouteItem> } = {
  [UserRoles.ROLE_STUDENT]: [
    {
      targetUrlString: '/applications/student/create',
      icon: iconLibrary.faFileCirclePlus,
      label: TranslationKey.NEW_APPLICATION,
    },
    {
      targetUrlString: '/applications',
      icon: iconLibrary.faScroll,
      label: TranslationKey.MY_APPLICATION,
    },
  ],
  [UserRoles.ROLE_MENTOR]: [
    {
      targetUrlString: '/my-students',
      icon: iconLibrary.faUserGroup,
      label: TranslationKey.MY_STUDENTS,
    },
    {
      targetUrlString: '/applications',
      icon: iconLibrary.faScroll,
      label: TranslationKey.MY_STUDENT_APPLICATIONS,
    },
  ],
};
