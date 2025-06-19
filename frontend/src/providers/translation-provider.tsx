/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';

/* configuration, utilities, constants imports */
import { i18n } from '@daigaku/configuration';

/**
 *
 */
export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};
