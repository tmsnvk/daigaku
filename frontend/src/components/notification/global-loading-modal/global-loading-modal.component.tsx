/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { JSX } from 'react';

/* logic imports */
import { RenderModal, useRenderModal } from '@hooks/modal-components/use-render-modal';

/* component, style imports */
import { Dialog } from './global-loading-modal.styles';

/* configuration, utilities, constants imports */
import { iconLibraryConfig } from '@configuration';

/**
 * Defines the properties of the {@link GlobalLoadingModal} component.
 */
interface ComponentProps {
  /**
   * Indicates whether the modal should be visible.
   */
  readonly isVisible: boolean;

  /**
   * The loading text to be displayed in the modal.
   */
  readonly loadingText: string;
}

/**
 * Renders a modal to indicate loading status, providing feedback to the user.
 *
 * @param {ComponentProps} props
 * @return {JSX.Element}
 */
export const GlobalLoadingModal = ({ isVisible, loadingText }: ComponentProps): JSX.Element => {
  const { dialogRef }: RenderModal = useRenderModal(isVisible);

  return (
    <Dialog ref={dialogRef}>
      <p>
        {loadingText}
        <FontAwesomeIcon
          icon={iconLibraryConfig.faSpinner}
          spin
        />
      </p>
    </Dialog>
  );
};
