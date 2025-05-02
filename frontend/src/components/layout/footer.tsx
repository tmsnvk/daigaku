/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { useTranslation } from 'react-i18next';

/* configuration, utilities, constants imports */
import { getCurrentYear, joinTw } from '@daigaku/utilities';

/**
 * Renders the application's footer area.
 *
 * @return {JSX.Element}
 */
export const Footer = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      <div></div>
      <footer
        className={joinTw(
          'absolute bottom-0 flex flex-col items-center justify-center',
          'h-28 w-full',
          'bg-primary border-secondary border-t-2',
          'text-xl',
        )}
      >
        <p>
          {t('initYear')} - {getCurrentYear()}
        </p>
        <p>{t('footerContent')}</p>
      </footer>
    </>
  );
};
