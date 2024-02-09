import { GenericTextParagraph } from '@components/shared/general';
import { LoadingSpinnerIcon } from '@components/shared/icon-styles';
import { DialogContainer } from './GlobalLoadingModal.styles.ts';
import { iconLibraryConfig } from '@configuration';

const GlobalLoadingModal = () => {
  return (
    <DialogContainer>
      <GenericTextParagraph content={'The application is looking for your data... please wait.'} />
      <LoadingSpinnerIcon icon={iconLibraryConfig.faSpinner} spin />
    </DialogContainer>
  );
};

export default GlobalLoadingModal;
