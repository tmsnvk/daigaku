/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

/* logic imports */
import { joinTw } from '@daigaku/utilities';

/* component imports */
import { CoreFetchError, CoreFetchSkeleton } from '@daigaku/components/core';

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
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className={joinTw('flex justify-center', 'h-50')}>
        <CoreFetchSkeleton
          intent={'primary'}
          size={'mid'}
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div className={joinTw('flex justify-center', 'h-50')}>
        <CoreFetchError
          message={t('queryFetchError')}
          onRetry={onRetry}
          size={'mid'}
        />
      </div>
    );
  }

  return <>{children}</>;
};
