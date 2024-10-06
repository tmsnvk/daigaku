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

/* external imports */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
 * @interface
 * @description
 * The interface represents the properties of the {@link GlobalLoadingModal} component.
 *
 * @since 0.0.1
 */
interface ComponentProps {
  readonly isVisible: boolean;
  readonly loadingText: string;
}

/**
 * @component
 * @description
 * The component renders a modal dialog while loading data, providing feedback to the user.
 *
 * @param {ComponentProps} props
 * @param props.isVisible Boolean value to indicate whether the modal should be visible.
 * @param props.loadingText The specific loading text to be displayed.
 *
 * @returns {JSX.Element}
 *
 * @since 0.0.1
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
