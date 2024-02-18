import { GeneralIcon } from '@components/shared/icon-styles';
import { DialogContainer } from './GlobalLoadingModal.styles.ts';
import { iconLibraryConfig } from '@configuration';

const GlobalLoadingModal = () => {
  return (
    <DialogContainer>
      <p>The application is compiling your data... please wait.</p>
      <GeneralIcon icon={iconLibraryConfig.faSpinner} spin />
    </DialogContainer>
  );
};

export default GlobalLoadingModal;
