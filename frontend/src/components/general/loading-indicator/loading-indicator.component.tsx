/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

/* external imports */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* component, style imports */
import { Article } from './loading-indicator.styles';

/* configuration imports */
import { iconLibraryConfig } from '@configuration';

/**
 * ===============
 * Component {@link LoadingIndicator}
 * ===============
 */

/**
 * Defines the properties of the {@link LoadingIndicator} component.
 *
 * @since 0.0.1
 */
interface ComponentProps {
  /**
   * The message displayed while loading, providing context to the user.
   */
  readonly loadingText: string;
}

/**
 * Renders a loading indicator component that displays a loading message and a spinner icon.
 *
 * @param {ComponentProps} props
 * @return {JSX.Element}
 *
 * @since 0.0.1
 */
export const LoadingIndicator = ({ loadingText }: ComponentProps): JSX.Element => {
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
