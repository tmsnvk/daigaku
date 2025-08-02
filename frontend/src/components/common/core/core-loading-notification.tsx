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
import { joinTw } from '@daigaku/utilities';

/* configuration, constants imports */
import { iconLibrary } from '@daigaku/constants';

const coreDialogVariants = cva(
  joinTw(
    'core-loading-dialog-window flex flex-col items-center my-[25%] mx-auto px-10 bg-transparent text-4xl tracking-wide leading-10 font-semibold text-center',
    'focus:outline-0',
  ),
  {
    variants: {
      intent: {
        light: 'text-secondary',
      },
    },
  },
);

/**
 * Defines the component's properties.
 */
interface CoreLoadingNotificationProps extends VariantProps<typeof coreDialogVariants> {}

/**
 * Renders the core dialog component used throughout the application.
 *
 * @param {CoreLoadingNotificationProps} props
 * @return {JSX.Element}
 */
export const CoreLoadingNotification = ({ intent }: CoreLoadingNotificationProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <section className={joinTw(coreDialogVariants({ intent }))}>
      <p className={'mb-12'}>{t('app.generic.loading.dataCompilation')}</p>
      <FontAwesomeIcon
        icon={iconLibrary.faCircleNotch}
        spin
        style={{ width: '7rem', height: '7rem' }}
      />
    </section>
  );
};
