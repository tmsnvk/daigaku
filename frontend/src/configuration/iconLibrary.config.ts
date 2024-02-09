import { IconLookup } from '@fortawesome/fontawesome-svg-core';

type IconLibraryConfigT = {
  [key: string]: IconLookup
}

const iconLibraryConfig: IconLibraryConfigT = {
  faCircleExclamation: { prefix: 'fas', iconName: 'circle-exclamation' },
  faCircleNotch: { prefix: 'fas', iconName: 'circle-notch' },
  faEye: { prefix: 'fas', iconName: 'eye' },
  faEyeSlash: { prefix: 'fas', iconName: 'eye-slash' },
  faGraduationCap: { prefix: 'fas', iconName: 'graduation-cap' },
  faSpinner: { prefix: 'fas', iconName: 'spinner' },
};

export default iconLibraryConfig;

