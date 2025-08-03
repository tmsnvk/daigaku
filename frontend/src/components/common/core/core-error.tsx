/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { VariantProps, cva } from 'class-variance-authority';
import { JSX } from 'react';
import { useTranslation } from 'react-i18next';

/* logic imports */
import { joinTw } from '@daigaku/utilities';

/* component imports */
import { CoreButton } from './core-button.tsx';

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
interface CoreErrorProps extends VariantProps<typeof coreErrorVariants> {
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
 * @param {CoreErrorProps}
 * @return {JSX.Element}
 */
export const CoreError = ({ onRetry, message, size }: CoreErrorProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <article className={joinTw(coreErrorVariants({ size }))}>
      <p className={'mb-4'}>{message}</p>
      <CoreButton
        intent={'destructiveSlim'}
        label={t('app.generic.error.tryAgain')}
        onClick={onRetry}
      />
    </article>
  );
};
