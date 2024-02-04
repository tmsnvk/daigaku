import {
  useEffect,
  useRef,
} from 'react';
import GenericTextParagraph from '@components/shared/general/GenericTextParagraph';
import { SubmitInput } from '@components/shared/form';
import theme from '@theme/theme.ts';
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
    }

    if (!dialogRef.current?.open && isVisible) {
      dialogRef.current?.showModal();
    }
  }, [isVisible]);

  return (
    <DialogContainer ref={dialogRef}>
      <GenericTextParagraph content={message} fontSize={theme.fontSize.large} />
      <SubmitInput type={'button'} value={'ok'} onClick={closeModal} />
    </DialogContainer>
  );
};

export default ConfirmationModal;
