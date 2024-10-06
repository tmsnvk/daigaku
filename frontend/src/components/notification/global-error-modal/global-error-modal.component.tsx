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
 * @interface
 * @description
 * The interface represents the properties of the {@link GlobalErrorModal} component.
 *
 * @since 0.0.1
 */
interface ComponentProps {
  readonly isVisible: boolean;
  readonly errorText?: string;
  readonly onCloseModal: () => void;
}

/**
 * @component
 * @description
 * The component renders a modal dialog when an unexpected error occurs in the application.
 *
 * @param {ComponentProps} props
 * @param props.isVisible Boolean value to indicate whether the modal should be visible.
 * @param props.errorText The specific error message to be displayed, if available.
 * @param props.onCloseModal A callback function to close the modal.
 *
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
        value={'ok'}
        autoFocus={true}
        onClick={onCloseModal}
      />
    </Dialog>
  );
};
