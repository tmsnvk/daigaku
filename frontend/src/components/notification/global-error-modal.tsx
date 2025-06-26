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
import { joinTw } from '@daigaku/utilities';

/* component imports */
import { CoreModalClosingInputElement } from '../form';

/**
 * Defines the component's properties.
 */
interface GlobalErrorModalProps {
  /**
   * Indicates whether the modal should be visible.
   */
  readonly isVisible: boolean;

  /**
   * The specific error message to be displayed, if available.
   */
  readonly errorText?: string;

  /**
   * A callback method invoked to close the modal.
   */
  onCloseModal: () => void;
}

/**
 * Renders a modal when an unexpected error occurs in the application.
 *
 * @param {GlobalErrorModalProps} props
 * @return {JSX.Element}
 */
export const GlobalErrorModal = ({ isVisible, errorText, onCloseModal }: GlobalErrorModalProps): JSX.Element => {
  const { t } = useTranslation();

  const { dialogRef } = useRenderModal(isVisible);

  return (
    <dialog
      ref={dialogRef}
      className={joinTw('flex flex-col', 'w-5/10', 'bg-primary')}
    >
      <p className={'mx-6 my-10'}>{t('unexpectedError')}</p>
      {errorText && <p>{errorText}</p>}
      <CoreModalClosingInputElement
        value={t('acceptanceOk')}
        onClick={onCloseModal}
      />
    </dialog>
  );
};
