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
import { SubmitInput } from '@components/form';
import { Dialog } from './global-error-modal.styles.ts';

/* configuration, utilities, constants imports */
import { localization as l } from '@constants';

/**
 * Defines the component's properties.
 */
interface ComponentProps {
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
 * @param {ComponentProps} props
 * @return {JSX.Element}
 */
export const GlobalErrorModal = ({ isVisible, errorText, onCloseModal }: ComponentProps): JSX.Element => {
  const { dialogRef } = useRenderModal(isVisible);

  return (
    <Dialog ref={dialogRef}>
      <p>{l.COMPONENTS.NOTIFICATION.MODAL.ERROR.MESSAGE[0]}</p>
      {errorText && <p>{errorText}</p>}
      <p>{l.COMPONENTS.NOTIFICATION.MODAL.ERROR.MESSAGE[1]}</p>
      <SubmitInput
        type={'button'}
        value={l.COMPONENTS.NOTIFICATION.MODAL.ERROR.ACCEPTANCE}
        autoFocus={true}
        onClick={onCloseModal}
      />
    </Dialog>
  );
};
