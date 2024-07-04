import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Dialog } from './GlobalLoadingModal.styles.ts';

import { iconLibraryConfig } from '@configuration';

type ComponentPropsT = {
  content: string;
}

const GlobalLoadingModal = ({ content }: ComponentPropsT) => {
  return (
    <Dialog>
      <p>{content}</p>
      <FontAwesomeIcon
        icon={iconLibraryConfig.faSpinner}
        spin
      />
    </Dialog>
  );
};

export default GlobalLoadingModal;
