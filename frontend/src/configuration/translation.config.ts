/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

/* configuration, constants imports */
import { translations } from '@daigaku/constants';

const flattenTranslationObject = <T extends Record<string, unknown>>(obj: T, prefix = ''): Record<string, string> => {
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'string') {
      result[fullKey] = value;
    } else if (typeof value === 'object' && value !== null) {
      const nested = flattenTranslationObject(value as Record<string, unknown>, fullKey);

      Object.assign(result, nested);
    }
  }

  return result;
};

const resources = translations.reduce<Record<string, { translation: Record<string, string> }>>((acc, t) => {
  acc[t.code] = {
    translation: flattenTranslationObject(t.value),
  };

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
