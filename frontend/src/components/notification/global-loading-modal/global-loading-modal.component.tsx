/**
 * @prettier
 */

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Dialog } from './global-loading-modal.styles';

import { iconLibraryConfig } from '@configuration';

interface ComponentProps {
  readonly content: string;
}

export const GlobalLoadingModal = ({ content }: ComponentProps) => {
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
