/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 */

/* logic imports */
import { RenderModal, useRenderModal } from '@hooks/modal-components/use-render-modal';

/* component, style imports */
import { SubmitInput } from '@components/form';
import { Dialog } from './confirmation-modal.styles';

/**
 * ===============
 * Component {@link ConfirmationModal}
 * ===============
 */

/**
 * @interface
 * @description
 * The interface represents the properties of the {@link ConfirmationModal} component.
 *
 * @since 0.0.1
 */
interface ComponentProps {
  readonly isVisible: boolean;
  readonly message: string;
  readonly onCloseModal: () => void;
}

/**
 * @component
 * @description
 * The component renders a modal dialog for user confirmation with a message.
 *
 * @param {ComponentProps} props
 * @param props.isVisible Boolean value to indicate whether the modal should be visible.
 * @param props.message The message to be displayed in the modal.
 * @param props.onCloseModal A callback function to be called when the modal is closed.
 *
 * @returns {JSX.Element}
 *
 * @since 0.0.1
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
