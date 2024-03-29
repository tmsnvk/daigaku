import {
  useEffect,
  useRef,
} from 'react';
import { GenericTextParagraph } from '@components/shared/general';
import { SubmitInput } from '@components/shared/form';
import DefaultDialogStyles from '../DefaultDialogStyles';

type ComponentPropsT = {
  isVisible: boolean;
  message: string;
  closeModal: () => void;
}

const ConfirmationModal = ({ isVisible, message, closeModal }: ComponentPropsT) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialogRef.current?.open && !isVisible) {
      dialogRef.current?.close();
    }

    if (!dialogRef.current?.open && isVisible) {
      dialogRef.current?.showModal();
    }
  }, [isVisible]);

  return (
    <DefaultDialogStyles ref={dialogRef}>
      <GenericTextParagraph content={message} />
      <SubmitInput type={'button'} value={'ok'} onClick={closeModal} />
    </DefaultDialogStyles>
  );
};

export default ConfirmationModal;
