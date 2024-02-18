import { IconLookup } from '@fortawesome/fontawesome-svg-core';

type IconLibraryConfigT = {
  [key: string]: IconLookup
}

const iconLibraryConfig: IconLibraryConfigT = {
  faCircleExclamation: { prefix: 'fas', iconName: 'circle-exclamation' },
  faCircleNotch: { prefix: 'fas', iconName: 'circle-notch' },
  faEye: { prefix: 'fas', iconName: 'eye' },
  faEyeSlash: { prefix: 'fas', iconName: 'eye-slash' },
  faFileCirclePlus:  { prefix: 'fas', iconName: 'file-circle-plus' },
  faGraduationCap: { prefix: 'fas', iconName: 'graduation-cap' },
  faPaperPlane: { prefix: 'fas', iconName: 'paper-plane' },
  faScroll: { prefix: 'fas', iconName: 'scroll' },
  faSpinner: { prefix: 'fas', iconName: 'spinner' },
  faUserGroup: { prefix: 'fas', iconName: 'user-group' },
};

export default iconLibraryConfig;

