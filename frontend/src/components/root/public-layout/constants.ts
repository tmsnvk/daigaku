/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* configuration, constants imports */
import { TranslationKey, iconLibrary } from '@daigaku/constants';

/* interface, type imports */
import { NavigationRouteItem } from '@daigaku/common-types';

export const navigationRoutes: Array<NavigationRouteItem> = [
  {
    targetUrlString: '/',
    icon: iconLibrary.faGraduationCap,
    label: 'Daigaku',
  },
  {
    targetUrlString: '/contact',
    icon: iconLibrary.faPaperPlane,
    label: TranslationKey.CONTACT_US,
  },
];
