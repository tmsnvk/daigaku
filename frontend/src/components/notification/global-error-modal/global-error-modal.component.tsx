/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* logic imports */
import { useRenderModal } from '@hooks/modal-components/use-render-modal';

/* component, style imports */
import { SubmitInput } from '@components/form/index.ts';
import { Dialog } from './global-error-modal.styles.ts';

/* configuration, utilities, constants imports */
import { constants } from './global-error-modal.constants.ts';

/* interface, type, enum imports */
import { RenderModal } from '@common-types';

/**
 * Represents the properties of the {@link GlobalErrorModal} component.
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
 */
export const GlobalErrorModal = ({ isVisible, errorText, onCloseModal }: ComponentProps): JSX.Element => {
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
