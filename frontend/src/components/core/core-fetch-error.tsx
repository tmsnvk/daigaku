/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { useTranslation } from 'react-i18next';

/* component imports */
import { CoreButton } from './core-button.tsx';

/* configuration, utilities, constants imports */
import { joinTw } from '@daigaku/utilities';

/**
 * Defines the component's properties.
 */
interface CoreFetchErrorProps {
  /**
   *
   */
  onRetry: () => void;

  /**
   *
   */
  readonly message: string;

  /**
   *
   */
  readonly className?: string;
}

/**
 *
 *
 * @param {CoreFetchErrorProps}
 * @return {JSX.Element}
 */
export const CoreFetchError = ({ onRetry, message, className }: CoreFetchErrorProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <article className={joinTw('text-destructive text-xl font-bold tracking-wider', className)}>
      <p className={joinTw('mb-4')}>{message}</p>
      <CoreButton
        label={t('tryAgain')}
        onClick={onRetry}
        intent={'destructiveSlim'}
      />
    </article>
  );
};
