/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { type VariantProps, cva } from 'class-variance-authority';
import { JSX } from 'react';
import { useTranslation } from 'react-i18next';

/* logic imports */
/* configuration, utilities, constants imports */
import { iconLibraryConfig } from '@daigaku/configuration';
import { joinTw } from '@daigaku/utilities';

const coreDialogVariants = cva(
  joinTw(
    'core-loading-dialog-window',
    'flex items-center',
    'my-[25%] mx-auto px-10',
    'bg-transparent',
    'text-4xl tracking-wide leading-10 font-semibold text-center',
    'focus:outline-0',
  ),
  {
    variants: {
      intent: {
        light: joinTw('text-secondary'),
      },
    },
  },
);

/**
 * Defines the component's properties.
 */
interface CoreLoadingNotificationProps extends VariantProps<typeof coreDialogVariants> {
  /**
   * The button's additional style options.
   */
  readonly className?: string;
}

/**
 * Renders the core dialog component used throughout the application.
 *
 * @param {CoreLoadingNotificationProps} props
 * @return {JSX.Element}
 */
export const CoreLoadingNotification = ({ intent, className }: CoreLoadingNotificationProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <section className={joinTw(coreDialogVariants({ intent, className }), 'flex flex-col items-center')}>
      <p className={'mb-12'}>{t('dataCompilation')}</p>
      <FontAwesomeIcon
        icon={iconLibraryConfig.faCircleNotch}
        spin
        style={{ width: '7rem', height: '7rem' }}
      />
    </section>
  );
};
