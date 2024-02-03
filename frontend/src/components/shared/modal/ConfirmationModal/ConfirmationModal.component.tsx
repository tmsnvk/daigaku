import {
  useEffect,
  useRef,
} from 'react';
import { DialogContainer } from './ConfirmationModal.styles.ts';

type ComponentPropT = {
  isVisible: boolean;
  message: string;
}

const ConfirmationModal = ({ isVisible, message }: ComponentPropT) => {
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
    </DialogContainer>
  );
};

export default ConfirmationModal;
