/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* component imports */
import { CoreIcon } from '../core';

/* configuration, utilities, constants imports */
import { iconLibraryConfig } from '@daigaku/configuration';

/**
 * Defines the component's properties.
 */
interface LoadingIndicatorProps {
  /**
   * The message displayed while loading the active page.
   */
  readonly loadingText: string;
}

/**
 * Renders a loading indicator component that displays a loading message and a spinner icon.
 *
 * @param {LoadingIndicatorProps} props
 * @return {JSX.Element}
 */
export const LoadingIndicator = ({ loadingText }: LoadingIndicatorProps): JSX.Element => {
  return (
    <article className={'text-secondary flex items-center justify-center text-2xl'}>
      <p>{loadingText}</p>
      <CoreIcon
        icon={iconLibraryConfig.faSpinner}
        spin
        className={'ml-4'}
      />
    </article>
  );
};
