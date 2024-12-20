/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* external imports */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { JSX } from 'react';

/* logic imports */
import { RenderModal, useRenderModal } from '@hooks/modal-components/use-render-modal';

/* component, style imports */
import { Dialog } from './global-loading-modal.styles';

/* configuration, utilities, constants imports */
import { iconLibraryConfig } from '@configuration';

/**
 * ===============
 * Component {@link GlobalLoadingModal}
 * ===============
 */

/**
 * Defines the properties of the {@link GlobalLoadingModal} component.
 *
 * @since 0.0.1
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
 *
 * @since 0.0.1
 */
export const GlobalLoadingModal = ({ isVisible, loadingText }: ComponentProps): JSX.Element => {
  // Custom hook that manages the rendering of the modal based on visibility state.
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
