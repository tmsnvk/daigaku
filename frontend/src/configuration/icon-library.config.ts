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
import { IconLookup, library } from '@fortawesome/fontawesome-svg-core';
import {
  faBars,
  faCircleExclamation,
  faCircleNotch,
  faEnvelope,
  faEye,
  faEyeSlash,
  faFileArrowDown,
  faFileCirclePlus,
  faGears,
  faGraduationCap,
  faHouseUser,
  faMagnifyingGlass,
  faPaperPlane,
  faRightFromBracket,
  faRotateRight,
  faScroll,
  faSort,
  faSpinner,
  faTable,
  faUser,
  faUserGroup,
  faWrench,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faBars,
  faCircleExclamation,
  faCircleNotch,
  faEnvelope,
  faEye,
  faEyeSlash,
  faFileArrowDown,
  faFileCirclePlus,
  faGears,
  faGraduationCap,
  faHouseUser,
  faMagnifyingGlass,
  faPaperPlane,
  faRightFromBracket,
  faRotateRight,
  faScroll,
  faSort,
  faSpinner,
  faTable,
  faUser,
  faUserGroup,
  faWrench,
  faXmark,
);

/**
 * The interface represents the properties of the {@link iconLibraryConfig} configuration object.
 *
 * @since 0.0.1
 */
interface IconLibraryConfig {
  [key: string]: IconLookup;
}

/**
 * @since 0.0.1
 */
export const iconLibraryConfig: IconLibraryConfig = {
  faBars: { prefix: 'fas', iconName: 'bars' },
  faCircleExclamation: { prefix: 'fas', iconName: 'circle-exclamation' },
  faCircleNotch: { prefix: 'fas', iconName: 'circle-notch' },
  faEnvelope: { prefix: 'fas', iconName: 'envelope' },
  faEye: { prefix: 'fas', iconName: 'eye' },
  faEyeSlash: { prefix: 'fas', iconName: 'eye-slash' },
  faFileCirclePlus: { prefix: 'fas', iconName: 'file-circle-plus' },
  faFileArrowDown: { prefix: 'fas', iconName: 'file-arrow-down' },
  faGears: { prefix: 'fas', iconName: 'gears' },
  faGraduationCap: { prefix: 'fas', iconName: 'graduation-cap' },
  faHouseUser: { prefix: 'fas', iconName: 'house-user' },
  faMagnifyingGlass: { prefix: 'fas', iconName: 'magnifying-glass' },
  faPaperPlane: { prefix: 'fas', iconName: 'paper-plane' },
  faRightFromBracket: { prefix: 'fas', iconName: 'right-from-bracket' },
  faRotateRight: { prefix: 'fas', iconName: 'rotate-right' },
  faScroll: { prefix: 'fas', iconName: 'scroll' },
  faSort: { prefix: 'fas', iconName: 'sort' },
  faSpinner: { prefix: 'fas', iconName: 'spinner' },
  faTable: { prefix: 'fas', iconName: 'table' },
  faUser: { prefix: 'fas', iconName: 'user' },
  faUserGroup: { prefix: 'fas', iconName: 'user-group' },
  faWrench: { prefix: 'fas', iconName: 'wrench' },
  faXMark: { prefix: 'fas', iconName: 'xmark' },
};
