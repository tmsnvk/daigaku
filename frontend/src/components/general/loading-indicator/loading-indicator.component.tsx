/**
 * @prettier
 */

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { iconLibraryConfig } from '@configuration';

import { Article } from './loading-indicator.styles';

interface ComponentProps {
  readonly content: string;
}

export const LoadingIndicator = ({ content }: ComponentProps) => {
  return (
    <Article>
      <p>{content}</p>
      <FontAwesomeIcon
        icon={iconLibraryConfig.faSpinner}
        spin
      />
    </Article>
  );
};
