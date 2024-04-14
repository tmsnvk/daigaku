import { IconLookup } from '@fortawesome/fontawesome-svg-core';
import { AccountRoleE } from '@context/AuthContext.tsx';
import { iconLibraryConfig } from '@configuration';

export type NavbarContentT = {
  url: string;
  icon: IconLookup;
  content: string;
}

const navbarContent: { [key in AccountRoleE]: NavbarContentT[] } = {
  [AccountRoleE.STUDENT]: [
    {
      url: '/new-application',
      icon: iconLibraryConfig.faFileCirclePlus,
      content: 'New Application',
    },
    {
      url: '/applications',
      icon: iconLibraryConfig.faScroll,
      content: 'My Applications',
    },
    {
      url: '/messages',
      icon: iconLibraryConfig.faEnvelope,
      content: 'Messages',
    },
    {
      url: '/feedback',
      icon: iconLibraryConfig.faGears,
      content: 'Feedback',
    },
  ],
  [AccountRoleE.MENTOR]: [
    {
      url: '/my-students',
      icon: iconLibraryConfig.faUserGroup,
      content: 'My Students',
    },
    {
      url: '/applications',
      icon: iconLibraryConfig.faScroll,
      content: 'My Student Applications',
    },
    {
      url: '/messages',
      icon: iconLibraryConfig.faEnvelope,
      content: 'Messages',
    },
    {
      url: '/feedback',
      icon: iconLibraryConfig.faGears,
      content: 'Feedback',
    },
  ],
  [AccountRoleE.INSTITUTION_ADMIN]: [
    {
      url: '/messages',
      icon: iconLibraryConfig.faEnvelope,
      content: 'Messages',
    },
  ],
  [AccountRoleE.SYSTEM_ADMIN]: [
    {
      url: '/all-students',
      icon: iconLibraryConfig.faUserGroup,
      content: 'All Students',
    },
    {
      url: '/all-mentors',
      icon: iconLibraryConfig.faUserGroup,
      content: 'All Mentors',
    },
    {
      url: '/applications',
      icon: iconLibraryConfig.faScroll,
      content: 'All Applications',
    },
    {
      url: '/messages',
      icon: iconLibraryConfig.faEnvelope,
      content: 'Messages',
    },
    {
      url: '/system',
      icon: iconLibraryConfig.faGears,
      content: 'System',
    },
  ],
};

export {
  navbarContent,
};
