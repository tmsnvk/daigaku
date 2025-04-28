/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { joinTw } from '@daigaku/utilities';
import { JSX } from 'react';
import { CoreButton } from './core-button.tsx'; /* configuration, utilities, constants imports */

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
  return (
    <article className={joinTw('text-destructive text-xl font-bold tracking-wider', className)}>
      <p className={joinTw('mb-4')}>{message}</p>
      <CoreButton
        label={'try again'}
        onClick={onRetry}
        intent={'destructiveSlim'}
      />
    </article>
  );
};
