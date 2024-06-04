import { useDisplayModal } from './ConfirmationModal.hooks.tsx';
import { TextParagraph } from '@components/general';
import { SubmitInput } from '@components/form';
import { BaseDialog } from '@components/base-styles';

type ComponentPropsT = {
  isVisible: boolean;
  message: string;
  closeModal: () => void;
}

const ConfirmationModal = ({ isVisible, message, closeModal }: ComponentPropsT) => {
  const { dialogRef } = useDisplayModal(isVisible);

  return (
    <BaseDialog ref={dialogRef}>
      <TextParagraph content={message} />
      <SubmitInput
        type={'button'}
        value={'ok'}
        onClick={closeModal}
      />
    </BaseDialog>
  );
};

export default ConfirmationModal;
