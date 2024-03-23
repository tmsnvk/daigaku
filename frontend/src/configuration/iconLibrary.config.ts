import { IconLookup } from '@fortawesome/fontawesome-svg-core';

type IconLibraryConfigT = {
  [key: string]: IconLookup
}

const iconLibraryConfig: IconLibraryConfigT = {
  faBars: { prefix: 'fas', iconName: 'bars' },
  faCircleExclamation: { prefix: 'fas', iconName: 'circle-exclamation' },
  faCircleNotch: { prefix: 'fas', iconName: 'circle-notch' },
  faEye: { prefix: 'fas', iconName: 'eye' },
  faEyeSlash: { prefix: 'fas', iconName: 'eye-slash' },
  faFileCirclePlus:  { prefix: 'fas', iconName: 'file-circle-plus' },
  faGraduationCap: { prefix: 'fas', iconName: 'graduation-cap' },
  faHouseUser: { prefix: 'fas', iconName: 'house-user' },
  faPaperPlane: { prefix: 'fas', iconName: 'paper-plane' },
  faRightFromBracket: { prefix: 'fas', iconName: 'right-from-bracket' },
  faScroll: { prefix: 'fas', iconName: 'scroll' },
  faSpinner: { prefix: 'fas', iconName: 'spinner' },
  faUserGroup: { prefix: 'fas', iconName: 'user-group' },
  faXMark: { prefix: 'fas', iconName: 'xmark' },
};

export default iconLibraryConfig;

