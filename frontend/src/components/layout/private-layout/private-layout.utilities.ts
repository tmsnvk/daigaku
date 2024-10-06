/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 */

/* external imports */
import { IconLookup } from '@fortawesome/fontawesome-svg-core';

/* configuration, utilities, constants imports */
import { iconLibraryConfig } from '@configuration';
import { constants } from './private-layout.constants';

/* interface, type, enum imports */
import { AccountRoleValues } from '@context/auth';

/**
 * @interface
 * @description
 * The interface represents a navigation route in the application.
 *
 * @since 0.0.1
 */
export interface NavbarRoute {
  readonly url: string;
  readonly icon: IconLookup;
  readonly label: string;
}

export const navigationRoutesByRole: { [key in AccountRoleValues]: Array<NavbarRoute> } = {
  [AccountRoleValues.STUDENT]: [
    { url: '/new-application', icon: iconLibraryConfig.faFileCirclePlus, label: constants.routes.student.newApplication.LABEL },
    { url: '/applications', icon: iconLibraryConfig.faScroll, label: constants.routes.student.myApplications.LABEL },
  ],
  [AccountRoleValues.MENTOR]: [
    { url: '/my-students', icon: iconLibraryConfig.faUserGroup, label: constants.routes.mentor.myStudents.LABEL },
    { url: '/applications', icon: iconLibraryConfig.faScroll, label: constants.routes.mentor.myStudentApplications.LABEL },
  ],
  [AccountRoleValues.INSTITUTION_ADMIN]: [],
  [AccountRoleValues.SYSTEM_ADMIN]: [
    { url: '/all-students', icon: iconLibraryConfig.faUserGroup, label: constants.routes.systemAdmin.allStudents.LABEL },
    { url: '/all-mentors', icon: iconLibraryConfig.faUserGroup, label: constants.routes.systemAdmin.allMentors.LABEL },
    { url: '/applications', icon: iconLibraryConfig.faScroll, label: constants.routes.systemAdmin.allApplications.LABEL },
    { url: '/system', icon: iconLibraryConfig.faGears, label: constants.routes.systemAdmin.system.LABEL },
  ],
};

export const sharedNavigationRoutes: Array<NavbarRoute> = [
  { url: '/account', icon: iconLibraryConfig.faUser, label: constants.routes.shared.myAccount.LABEL },
  { url: '/messages', icon: iconLibraryConfig.faEnvelope, label: constants.routes.shared.messages.LABEL },
  { url: '/feedback', icon: iconLibraryConfig.faGears, label: constants.routes.shared.feedback.LABEL },
];
