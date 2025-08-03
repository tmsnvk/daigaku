/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { useTranslation } from 'react-i18next';

/* component imports */
import { CoreIcon } from './core-icon.tsx';

/* configuration, constants imports */
import { iconLibrary } from '@daigaku/constants';

/**
 * Renders the core full-page loading component used throughout the application.
 *
 * @return {JSX.Element}
 */
export const CorePageLoader = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <section className={'flex h-screen flex-col items-center justify-center p-6 text-4xl font-semibold tracking-wide'}>
      <p className={'mb-12'}>{t('app.generic.loading.dataCompilation')}</p>
      <CoreIcon
        spin
        icon={iconLibrary.faCircleNotch}
        style={{ width: '7rem', height: '7rem' }}
      />
    </section>
  );
};
