/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* configuration, utilities, constants imports */
import { iconLibraryConfig } from '@configuration';
import { constants } from './private-layout.constants';

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
      label: constants.routes.student.newApplication.LABEL,
    },
    {
      url: '/applications',
      icon: iconLibraryConfig.faScroll,
      label: constants.routes.student.myApplications.LABEL,
    },
  ],
  [AccountRoles.ROLE_MENTOR]: [
    {
      url: '/my-students',
      icon: iconLibraryConfig.faUserGroup,
      label: constants.routes.mentor.myStudents.LABEL,
    },
    {
      url: '/applications',
      icon: iconLibraryConfig.faScroll,
      label: constants.routes.mentor.myStudentApplications.LABEL,
    },
  ],
  [AccountRoles.ROLE_INSTITUTION_ADMIN]: [],
  [AccountRoles.ROLE_SYSTEM_ADMIN]: [
    {
      url: '/all-students',
      icon: iconLibraryConfig.faUserGroup,
      label: constants.routes.systemAdmin.allStudents.LABEL,
    },
    {
      url: '/all-mentors',
      icon: iconLibraryConfig.faUserGroup,
      label: constants.routes.systemAdmin.allMentors.LABEL,
    },
    {
      url: '/applications',
      icon: iconLibraryConfig.faScroll,
      label: constants.routes.systemAdmin.allApplications.LABEL,
    },
    {
      url: '/system',
      icon: iconLibraryConfig.faGears,
      label: constants.routes.systemAdmin.system.LABEL,
    },
  ],
};

/**
 * Defines shared navigation routes accessible to all authenticated users.
 */
export const sharedNavigationRoutes: Array<NavbarRoute> = [
  { url: '/account', icon: iconLibraryConfig.faUser, label: constants.routes.shared.myAccount.LABEL },
  { url: '/messages', icon: iconLibraryConfig.faEnvelope, label: constants.routes.shared.messages.LABEL },
  { url: '/feedback', icon: iconLibraryConfig.faGears, label: constants.routes.shared.feedback.LABEL },
];
