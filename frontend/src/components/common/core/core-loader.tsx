/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* component imports */
import { CoreIcon } from './core-icon.tsx';

/* configuration, constants imports */
import { iconLibrary } from '@daigaku/constants';

/**
 * Defines the component's properties.
 */
interface CoreLoaderProps {
  /**
   * The message displayed while loading the active page.
   */
  readonly loadingText: string;
}

/**
 * Renders a loading indicator component that displays a loading message and a spinner icon.
 *
 * @param {CoreLoaderProps} props
 * @return {JSX.Element}
 */
export const CoreLoader = ({ loadingText }: CoreLoaderProps): JSX.Element => {
  return (
    <article className={'text-secondary flex items-center justify-center text-2xl'}>
      <p>{loadingText}</p>
      <CoreIcon
        spin
        className={'ml-4'}
        icon={iconLibrary.faSpinner}
      />
    </article>
  );
};
