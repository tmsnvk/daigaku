import { AccountRoleE } from '@context/AuthContext.tsx';
import { iconLibraryConfig } from '@configuration';

const navbarContent = {
  [AccountRoleE.Student]: [
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
      url: '/contact',
      icon: iconLibraryConfig.faPaperPlane,
      content: 'Contact Us',
    },
  ],
  [AccountRoleE.Mentor]: [
    {
      url: '/all-students',
      icon: iconLibraryConfig.faUserGroup,
      content: 'My Students',
    },
    {
      url: '/all-applications',
      icon: iconLibraryConfig.faScroll,
      content: 'Student Applications',
    },
    {
      url: '/contact',
      icon: iconLibraryConfig.faPaperPlane,
      content: 'Contact Us',
    },
  ],
  [AccountRoleE.Admin]: [
    {
      url: '/all-students',
      icon: iconLibraryConfig.faUserGroup,
      content: 'My Students',
    },
    {
      url: '/all-applications',
      icon: iconLibraryConfig.faScroll,
      content: 'Student Applications',
    },
  ],
};

export {
  navbarContent,
};
