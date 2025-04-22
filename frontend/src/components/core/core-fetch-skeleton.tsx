/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { type VariantProps, cva } from 'class-variance-authority';
import { JSX } from 'react';

/* configuration, utilities, constants imports */
import { joinTw } from '@daigaku/utilities';

const coreFetchSkeletonVariants = cva(joinTw('animate-pulse blur-sm rounded'), {
  variants: {
    intent: {
      primary: 'bg-primary',
      secondary: 'bg-secondary',
      tertiary: 'bg-tertiary',
      accent: 'bg-accent',
    },
  },
});

/**
 * Defines the component's properties.
 */
interface CoreFetchSkeletonProps extends VariantProps<typeof coreFetchSkeletonVariants> {
  /**
   *
   */
  readonly className?: string;
}

/**
 *
 *
 * @param {CoreFetchSkeletonProps}
 * @return {JSX.Element}
 */
export const CoreFetchSkeleton = ({ intent, className }: CoreFetchSkeletonProps): JSX.Element => {
  return <article className={joinTw(coreFetchSkeletonVariants({ intent }), className)}></article>;
};
