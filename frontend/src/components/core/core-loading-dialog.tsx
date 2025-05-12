/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { type VariantProps, cva } from 'class-variance-authority';
import { JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* logic imports */
import { useRenderModal } from '@daigaku/hooks';

/* configuration, utilities, constants imports */
import { joinTw } from '@daigaku/utilities';
import { iconLibraryConfig } from '@daigaku/configuration';

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
interface CoreDialogProps extends VariantProps<typeof coreDialogVariants> {
  /**
   * Indicates whether the component should be visible.
   */
  readonly isVisible: boolean;

  /**
   * The button's additional style options.
   */
  readonly className?: string;
}

/**
 * Renders the core dialog component used throughout the application.
 *
 * @param {CoreDialogProps} props
 * @return {JSX.Element}
 */
export const CoreLoadingDialog = ({ isVisible, intent, className }: CoreDialogProps): JSX.Element => {
  const { t } = useTranslation();

  const { dialogRef } = useRenderModal(isVisible);

  return (
    <dialog
      ref={dialogRef}
      className={joinTw(coreDialogVariants({ intent, className }), '')}
    >
      <div className={'flex flex-col items-center'}>
        <p className={'mb-12'}>{t('dataCompilation')}</p>
        <FontAwesomeIcon
          icon={iconLibraryConfig.faCircleNotch}
          spin
          style={{ width: '7rem', height: '7rem' }}
        />
      </div>
    </dialog>
  );
};
