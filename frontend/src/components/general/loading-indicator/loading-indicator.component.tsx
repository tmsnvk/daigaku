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
  readonly message: string;
}

/*
 * component - TODO - add functionality description
 */
export const LoadingIndicator = ({ message }: ComponentProps) => {
  return (
    <Article>
      <p>{message}</p>
      <FontAwesomeIcon
        icon={iconLibraryConfig.faSpinner}
        spin
      />
    </Article>
  );
};
