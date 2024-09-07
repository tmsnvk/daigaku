/**
 * @prettier
 */

/* external imports */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* component, style imports */
import { Article } from './loading-indicator.styles';

/* configuration imports */
import { iconLibraryConfig } from '@configuration';

/* interfaces, types, enums */
interface ComponentProps {
  readonly loadingText: string;
}

/*
 * component - TODO - add functionality description
 */
export const LoadingIndicator = ({ loadingText }: ComponentProps) => {
  return (
    <Article>
      <p>{loadingText}</p>
      <FontAwesomeIcon
        icon={iconLibraryConfig.faSpinner}
        spin
      />
    </Article>
  );
};
