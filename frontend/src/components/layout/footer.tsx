/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { useTranslation } from 'react-i18next';

/* logic imports */
import { getCurrentYear, joinTw } from '@daigaku/utilities';

/**
 *
 */
interface FooterProps {
  /**
   *
   */
  readonly build: string;
}

/**
 * Renders the application's footer area.
 *
 * @return {JSX.Element}
 */
export const Footer = ({ build }: FooterProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <footer
      className={joinTw(
        'bg-primary border-secondary absolute bottom-0 flex h-28 w-full flex-col items-center justify-center border-t-2 text-xl',
      )}
    >
      <p>
        {t('initYear')} - {getCurrentYear()}
      </p>
      <p>{t('footerContent')}</p>
      <p className='ml-4 self-start text-sm'>BUILD-ID: {build}</p>
    </footer>
  );
};
