import { IconLookup } from '@fortawesome/fontawesome-svg-core';

type IconLibraryConfig = {
  [key: string]: IconLookup
}

const iconLibraryConfig: IconLibraryConfig = {
  faCircleExclamation: { prefix: 'fas', iconName: 'circle-exclamation' },
  faCircleNotch: { prefix: 'fas', iconName: 'circle-notch' },
  faEye: { prefix: 'fas', iconName: 'eye' },
  faEyeSlash: { prefix: 'fas', iconName: 'eye-slash' },
};

export default iconLibraryConfig;

