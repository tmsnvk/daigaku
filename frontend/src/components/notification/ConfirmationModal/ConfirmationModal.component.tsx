import { useDisplayModal } from './ConfirmationModa.hooks.tsx';
import { TextParagraph } from '@components/general';
import { SubmitInput } from '@components/form';
import DefaultDialogStyles from '../DefaultDialogStyles';

type ComponentPropsT = {
  isVisible: boolean;
  message: string;
  closeModal: () => void;
}

const ConfirmationModal = ({ isVisible, message, closeModal }: ComponentPropsT) => {
  const { dialogRef } = useDisplayModal(isVisible);

  return (
    <DefaultDialogStyles ref={dialogRef}>
      <TextParagraph content={message} />
      <SubmitInput
        type={'button'}
        value={'ok'}
        onClick={closeModal}
      />
    </DefaultDialogStyles>
  );
};

export default ConfirmationModal;
