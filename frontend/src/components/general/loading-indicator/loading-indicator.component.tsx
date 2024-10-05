/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
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

/* interfaces, types, enums */
interface ComponentProps {
  readonly loadingText: string;
}

/**
 * @description
 * A loading indicator component that displays a loading message and a spinner icon.
 *
 * @param {ComponentProps} props
 * @param props.loadingText The text message that appears while the given component is loading and the indicator is active.
 *
 * @returns {JSX.Element}
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
