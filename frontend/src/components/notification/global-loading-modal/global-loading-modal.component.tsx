/**
 * @prettier
 */

/* external imports */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* component, style imports */
import { Dialog } from './global-loading-modal.styles';

/* configuration imports */
import { iconLibraryConfig } from '@configuration';

/* interfaces, types, enums */
interface ComponentProps {
  readonly message: string;
}

export const GlobalLoadingModal = ({ message }: ComponentProps) => {
  return (
    <Dialog>
      <p>{message}</p>
      <FontAwesomeIcon
        icon={iconLibraryConfig.faSpinner}
        spin
      />
    </Dialog>
  );
};
