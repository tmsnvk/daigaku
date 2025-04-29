/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

/* configuration, utilities, constants imports */
import { translations } from '@daigaku/constants';

const resources = translations.reduce(
  (acc, t) => {
    acc[t.code] = { translation: t.value };

    return acc;
  },
  {} as Record<string, { translation: Record<string, string> }>,
);

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  debug: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
