/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* logic imports */
import { useRenderModal } from '@hooks';

/* component, style imports */
import { CoreModalClosingInputElement } from '../form';

/* configuration, utilities, constants imports */
import { localization as l } from '@constants';

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
  const { dialogRef } = useRenderModal(isVisible);

  return (
    <dialog
      ref={dialogRef}
      className={'w-5/10 bg-primary flex flex-col'}
    >
      <p className={'mx-6 my-10'}>{l.COMPONENTS.NOTIFICATION.MODAL.ERROR.MESSAGE[0]}</p>
      {errorText && <p>{errorText}</p>}
      <p className={'mx-6 my-10'}>{l.COMPONENTS.NOTIFICATION.MODAL.ERROR.MESSAGE[1]}</p>
      <CoreModalClosingInputElement
        value={l.COMPONENTS.NOTIFICATION.MODAL.ERROR.ACCEPTANCE}
        onClick={onCloseModal}
      />
    </dialog>
  );
};
