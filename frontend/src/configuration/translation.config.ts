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

const resources = translations.reduce<Record<string, { translation: Record<string, string> }>>((acc, t) => {
  acc[t.code] = { translation: t.value };

  return acc;
}, {});

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  supportedLngs: ['en'],
  fallbackLng: 'en',
  debug: false,
});

export default i18n;
