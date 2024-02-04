import {
  useEffect,
  useRef,
} from 'react';
import { SubmitInput } from '@components/shared/form';
import { DialogContainer } from './ConfirmationModal.styles.ts';

type ComponentPropT = {
  isVisible: boolean;
  message: string;
  closeModal: () => void;
}

const ConfirmationModal = ({ isVisible, message, closeModal }: ComponentPropT) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialogRef.current?.open && !isVisible) {
      dialogRef.current?.close();
    } else if (!dialogRef.current?.open && isVisible) {
      dialogRef.current?.showModal();
    }
  }, [isVisible]);

  return (
    <DialogContainer
      ref={dialogRef}
    >
      <p>{message}</p>
      <SubmitInput type={'button'} value={'ok'} onClick={closeModal} />
    </DialogContainer>
  );
};

export default ConfirmationModal;
