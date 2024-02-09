import { LoadingSpinnerIcon } from '@components/shared/icon-styles';
import { DialogContainer } from './GlobalLoadingModal.styles.ts';
import { iconLibraryConfig } from '@configuration';

const GlobalLoadingModal = () => {
  return (
    <DialogContainer>
      <p>The application is looking for your data... please wait.</p>
      <LoadingSpinnerIcon icon={iconLibraryConfig.faSpinner} spin />
    </DialogContainer>
  );
};

export default GlobalLoadingModal;
