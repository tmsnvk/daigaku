/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { useTranslation } from 'react-i18next';

/* logic imports */
import { useRenderModal } from '@daigaku/hooks';

/* component imports */
import { CoreModalClosingInputElement } from '../form';

/* configuration, utilities, constants imports */
import { joinTw } from '@daigaku/utilities';

/**
 * Defines the component's properties.
 */
interface ConfirmationModalProps {
  /**
   * Indicates whether the modal should be visible.
   */
  readonly isVisible: boolean;

  /**
   * Callback function invoked to close the modal.
   */
  onCloseModal: () => void;

  /**
   * The message to be displayed in the modal.
   */
  readonly message?: string;
}

/**
 * Renders a modal dialog for user confirmation with a message.
 *
 * @param {ConfirmationModalProps} props
 * @return {JSX.Element}
 */
export const ConfirmationModal = ({ isVisible, onCloseModal, message }: ConfirmationModalProps): JSX.Element => {
  const { t } = useTranslation();

  const { dialogRef } = useRenderModal(isVisible);

  return (
    <dialog
      ref={dialogRef}
      className={joinTw('text-center')}
    >
      <p className={joinTw('pb-10', 'text-xl')}>{message}</p>
      <CoreModalClosingInputElement
        onClick={onCloseModal}
        value={t('acceptanceOk')}
      />
    </dialog>
  );
};
