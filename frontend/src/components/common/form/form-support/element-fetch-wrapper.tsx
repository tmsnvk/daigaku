/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

/* component imports */
import { CoreError, CoreSkeleton } from '@daigaku/components/common/core';

/**
 * Defines the component's properties.
 */
interface ElementFetchWrapperProps {
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
  readonly children: ReactNode | Array<ReactNode>;

  /**
   *
   */
  onRetry: () => void;
}

/**
 *
 *
 * @param {ElementFetchWrapperProps} props
 * @return {JSX.Element}
 */
export const ElementFetchWrapper = ({
  isLoading,
  isError,
  onRetry,
  children,
}: ElementFetchWrapperProps): JSX.Element => {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className={'h-50 flex justify-center'}>
        <CoreSkeleton
          intent={'primary'}
          size={'mid'}
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div className={'h-50 flex justify-center'}>
        <CoreError
          message={t('app.generic.error.queryFetchError')}
          size={'mid'}
          onRetry={onRetry}
        />
      </div>
    );
  }

  return <>{children}</>;
};
