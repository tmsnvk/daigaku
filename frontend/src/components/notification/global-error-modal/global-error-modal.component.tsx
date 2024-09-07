/**
 * @prettier
 */

/* logic imports */
import { RenderModal, useRenderModal } from '@hooks/modal-components/use-render-modal';

/* component, style imports */
import { SubmitInput } from '@components/form/index.ts';
import { Dialog } from './global-error-modal.styles.ts';

/* interfaces, types, enums */
interface ComponentProps {
  readonly isVisible: boolean;
  readonly errorText?: string;
  readonly onCloseModal: () => void;
}

/*
 * component - TODO - add functionality description
 */
export const GlobalErrorModal = ({ isVisible, errorText, onCloseModal }: ComponentProps) => {
  const { dialogRef }: RenderModal = useRenderModal(isVisible);

  return (
    <Dialog ref={dialogRef}>
      <p>The application has encountered an unexpected error.</p>
      {errorText ? <p>{errorText}</p> : ''}
      <p>Refresh your browser and try again.</p>
      <SubmitInput
        type={'button'}
        value={'ok'}
        autoFocus={true}
        onClick={() => onCloseModal()}
      />
    </Dialog>
  );
};
