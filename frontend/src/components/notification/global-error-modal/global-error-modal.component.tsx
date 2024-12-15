/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* logic imports */
import { RenderModal, useRenderModal } from '@hooks/modal-components/use-render-modal';

/* component, style imports */
import { SubmitInput } from '@components/form/index.ts';
import { constants } from './global-error-modal.constants.ts';
import { Dialog } from './global-error-modal.styles.ts';

/**
 * ===============
 * Component {@link GlobalErrorModal}
 * ===============
 */

/**
 * Represents the properties of the {@link GlobalErrorModal} component.
 *
 * @since 0.0.1
 */
interface ComponentProps {
  /**
   * Indicates whether the modal should be visible.
   */
  readonly isVisible: boolean;

  /**
   * The specific error message to be displayed, if available.
   */
  readonly errorText?: string;

  /**
   * Callback function invoked to close the modal.
   */
  readonly onCloseModal: () => void;
}

/**
 * Renders a modal when an unexpected error occurs in the application.
 *
 * @param {ComponentProps} props
 * @return {JSX.Element}
 *
 * @since 0.0.1
 */
export const GlobalErrorModal = ({ isVisible, errorText, onCloseModal }: ComponentProps): JSX.Element => {
  // Custom hook that manages the rendering of the modal based on visibility state.
  const { dialogRef }: RenderModal = useRenderModal(isVisible);

  return (
    <Dialog ref={dialogRef}>
      <p>{constants.ui.errors.MESSAGE[0]}</p>
      {errorText && <p>{errorText}</p>}
      <p>{constants.ui.errors.MESSAGE[1]}</p>
      <SubmitInput
        type={'button'}
        value={constants.ui.button.ACCEPTANCE}
        autoFocus={true}
        onClick={onCloseModal}
      />
    </Dialog>
  );
};
