/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { JSX } from 'react';

/* component, style imports */
import { Article } from './loading-indicator.styles';

/* configuration imports */
import { iconLibraryConfig } from '@configuration';

/**
 * Defines the properties of the {@link LoadingIndicator} component.
 */
interface ComponentProps {
  /**
   * The message displayed while loading the active page.
   */
  readonly loadingText: string;
}

/**
 * Renders a loading indicator component that displays a loading message and a spinner icon.
 *
 * @param {ComponentProps} props
 * @return {JSX.Element}
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
