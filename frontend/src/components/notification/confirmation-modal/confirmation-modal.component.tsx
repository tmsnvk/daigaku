/**
 * @prettier
 */

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
import { Dialog } from './confirmation-modal.styles';

/* interface, type, enum imports */
import { RenderModal } from '@common-types';

/**
 * Defines the component's properties.
 */
interface ComponentProps {
  /**
   * Indicates whether the modal should be visible.
   */
  readonly isVisible: boolean;

  /**
   * The message to be displayed in the modal.
   */
  readonly message?: string;

  /**
   * Callback function invoked to close the modal.
   */
  readonly onCloseModal: () => void;
}

/**
 * Renders a modal dialog for user confirmation with a message.
 *
 * @param {ComponentProps} props
 * @return {JSX.Element}
 */
export const ConfirmationModal = ({ isVisible, message, onCloseModal }: ComponentProps): JSX.Element => {
  const { dialogRef }: RenderModal = useRenderModal(isVisible);

  return (
    <Dialog ref={dialogRef}>
      <p>{message}</p>
      <SubmitInput
        type={'button'}
        value={'ok'}
        autoFocus={true}
        onClick={onCloseModal}
      />
    </Dialog>
  );
};
