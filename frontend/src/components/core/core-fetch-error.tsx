/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { VariantProps, cva } from 'class-variance-authority';
import { JSX } from 'react';
import { useTranslation } from 'react-i18next';

/* component imports */
import { CoreButton } from './core-button.tsx';

/* configuration, utilities, constants imports */
import { joinTw } from '@daigaku/utilities';

const coreErrorVariants = cva('text-destructive text-xl font-bold tracking-wider', {
  variants: {
    size: {
      mid: 'w-6/10 h-25',
    },
  },
});

/**
 * Defines the component's properties.
 */
interface CoreFetchErrorProps extends VariantProps<typeof coreErrorVariants> {
  /**
   *
   */
  onRetry: () => void;

  /**
   *
   */
  readonly message: string;
}

/**
 *
 *
 * @param {CoreFetchErrorProps}
 * @return {JSX.Element}
 */
export const CoreFetchError = ({ onRetry, message, size }: CoreFetchErrorProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <article className={joinTw(coreErrorVariants({ size }))}>
      <p className={'mb-4'}>{message}</p>
      <CoreButton
        label={t('tryAgain')}
        onClick={onRetry}
        intent={'destructiveSlim'}
      />
    </article>
  );
};
