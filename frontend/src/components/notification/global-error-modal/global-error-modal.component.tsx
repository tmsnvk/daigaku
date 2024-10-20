/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
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
 * @returns {JSX.Element}
 *
 * @since 0.0.1
 */
export const GlobalErrorModal = ({ isVisible, errorText, onCloseModal }: ComponentProps): JSX.Element => {
  const { dialogRef }: RenderModal = useRenderModal(isVisible);

  return (
    <Dialog ref={dialogRef}>
      <p>{constants.ui.ERROR_MESSAGE[0]}</p>
      {errorText && <p>{errorText}</p>}
      <p>{constants.ui.ERROR_MESSAGE[1]}</p>
      <SubmitInput
        type={'button'}
        value={constants.ui.ACCEPTANCE}
        autoFocus={true}
        onClick={onCloseModal}
      />
    </Dialog>
  );
};
