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
      url: '/my-applications',
      icon: iconLibraryConfig.faScroll,
      content: 'My Applications',
    },
    {
      url: '/contact',
      icon: iconLibraryConfig.faPaperPlane,
      content: 'Contact Us',
    },
  ],
  [AccountRoleE.MENTOR]: [
    {
      url: '/my-students',
      icon: iconLibraryConfig.faUserGroup,
      content: 'My Students',
    },
    {
      url: '/my-student-applications',
      icon: iconLibraryConfig.faScroll,
      content: 'My Student Applications',
    },
    {
      url: '/contact',
      icon: iconLibraryConfig.faPaperPlane,
      content: 'Contact Us',
    },
  ],
  [AccountRoleE.ADMIN]: [
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
      url: '/all-applications',
      icon: iconLibraryConfig.faScroll,
      content: 'All Applications',
    },
  ],
};

export {
  navbarContent,
};
