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
 * Defines the TranslationProvider component.
 */
interface TranslationProviderProps {
  children: ReactNode;
}

/**
 * Provides the i18next translation context.
 */
export const TranslationProvider = ({ children }: TranslationProviderProps) => {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};
