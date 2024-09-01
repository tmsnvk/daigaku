/**
 * @prettier
 */

/* logic imports */
import { RenderModal, useRenderModal } from './confirmation-modal.hooks';

/* component, style imports */
import { SubmitInput } from '@components/form';
import { Dialog } from './confirmation-modal.styles';

/* interfaces, types, enums */
interface ComponentProps {
  readonly isVisible: boolean;
  readonly message: string;
  readonly closeModal: () => void;
}

/**
 * component - TODO - add functionality description
 */
export const ConfirmationModal = ({ isVisible, message, closeModal }: ComponentProps) => {
  const { dialogRef }: RenderModal = useRenderModal(isVisible);

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
