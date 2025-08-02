/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

/* component imports */
import { CoreFetchError, CoreFetchSkeleton } from '@daigaku/components/common/core';

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
      <div className={'h-50 flex justify-center'}>
        <CoreFetchSkeleton
          intent={'primary'}
          size={'mid'}
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div className={'h-50 flex justify-center'}>
        <CoreFetchError
          message={t('app.generic.error.queryFetchError')}
          onRetry={onRetry}
          size={'mid'}
        />
      </div>
    );
  }

  return <>{children}</>;
};
