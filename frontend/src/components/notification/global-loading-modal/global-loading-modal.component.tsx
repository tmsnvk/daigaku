/**
 * @prettier
 */

/* external imports */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* logic imports */
import { RenderModal, useRenderModal } from '@hooks/modal-components/use-render-modal';

/* component, style imports */
import { Dialog } from './global-loading-modal.styles';

/* configuration imports */
import { iconLibraryConfig } from '@configuration';

/* interfaces, types, enums */
interface ComponentProps {
  readonly isVisible: boolean;
  readonly loadingText: string;
}

export const GlobalLoadingModal = ({ isVisible, loadingText }: ComponentProps) => {
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
