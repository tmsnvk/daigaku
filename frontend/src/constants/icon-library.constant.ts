/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
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

const icons = {
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
} as const;

library.add(...Object.values(icons));

export const iconLibrary: Record<keyof typeof icons, IconLookup> = Object.fromEntries(
  Object.entries(icons).map(([key, iconDefinition]) => {
    return [
      key,
      {
        prefix: iconDefinition.prefix,
        iconName: iconDefinition.iconName,
      },
    ];
  }),
) as Record<keyof typeof icons, IconLookup>;
