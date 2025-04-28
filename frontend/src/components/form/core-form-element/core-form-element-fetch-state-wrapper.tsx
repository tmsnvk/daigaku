/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX, ReactNode } from 'react';

/* component imports */
import { CoreFetchError, CoreFetchSkeleton } from '@daigaku/components/core';

/* configuration, utilities, constants imports */
import { joinTw } from '@daigaku/utilities';
import { localization as l } from '@daigaku/constants';

/**
 * Defines the component's properties.
 */
interface CoreFormElementFetchStateWrapperProps {
  /**
   *
   */
  readonly isLoading: boolean;

  /**
   *
   */
  readonly isError: boolean;

  /**
   *
   */
  onRetry: () => void;

  /**
   *
   */
  readonly children: ReactNode | Array<ReactNode>;
}

/**
 *
 *
 * @param {CoreFormElementFetchStateWrapperProps}
 * @return {JSX.Element}
 */
export const CoreFormElementFetchStateWrapper = ({
  isLoading,
  isError,
  onRetry,
  children,
}: CoreFormElementFetchStateWrapperProps): JSX.Element => {
  if (isLoading) {
    return (
      <div className={joinTw('flex justify-center', 'h-50')}>
        <CoreFetchSkeleton
          intent={'primary'}
          className={joinTw('w-6/10 h-25')}
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div className={joinTw('flex justify-center', 'h-50')}>
        <CoreFetchError
          message={l.COMPONENTS.NOTIFICATION.ERROR_FETCH}
          onRetry={onRetry}
          className={joinTw('w-6/10 h-25')}
        />
      </div>
    );
  }

  return <>{children}</>;
};
