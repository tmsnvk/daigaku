import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog } from './GlobalLoadingModal.styles.ts';
import { iconLibraryConfig } from '@configuration';

const GlobalLoadingModal = () => {
  return (
    <Dialog>
      <p>The application is compiling your data... please wait.</p>
      <FontAwesomeIcon icon={iconLibraryConfig.faSpinner} spin />
    </Dialog>
  );
};

export default GlobalLoadingModal;
