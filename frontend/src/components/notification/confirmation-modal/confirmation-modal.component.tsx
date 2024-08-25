/**
 * @prettier
 */

import { DisplayModal, useDisplayModal } from './confirmation-modal.hooks';

import { SubmitInput } from '@components/form';
import { Dialog } from './confirmation-modal.styles';

interface ComponentProps {
  readonly isVisible: boolean;
  readonly message: string;
  readonly closeModal: () => void;
}

export const ConfirmationModal = ({ isVisible, message, closeModal }: ComponentProps) => {
  const { dialogRef }: DisplayModal = useDisplayModal(isVisible);

  return (
    <Dialog ref={dialogRef}>
      <p>{message}</p>
      <SubmitInput
        type={'button'}
        value={'ok'}
        autoFocus={true}
        onClick={() => closeModal()}
      />
    </Dialog>
  );
};
