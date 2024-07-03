import { useDisplayModal } from './ConfirmationModal.hooks.tsx';

import { SubmitInput } from '@components/form';
import { Dialog } from './ConfirmationModal.styles.ts';

type ComponentPropsT = {
  isVisible: boolean;
  message: string;
  closeModal: () => void;
}

const ConfirmationModal = ({ isVisible, message, closeModal }: ComponentPropsT) => {
  const { dialogRef } = useDisplayModal(isVisible);

  return (
    <Dialog ref={dialogRef}>
      <p>{message}</p>
      <SubmitInput
        type={'button'}
        value={'ok'}
        autoFocus={true}
        onClick={closeModal}
      />
    </Dialog>
  );
};

export default ConfirmationModal;
