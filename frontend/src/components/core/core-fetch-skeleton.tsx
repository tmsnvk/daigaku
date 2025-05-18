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

const coreFetchSkeletonVariants = cva('animate-pulse blur-sm rounded', {
  variants: {
    intent: {
      primary: 'bg-primary',
      secondary: 'bg-secondary',
      tertiary: 'bg-tertiary',
      accent: 'bg-accent',
    },
    size: {
      mid: 'w-6/10 h-25',
    },
  },
});

/**
 * Defines the component's properties.
 */
interface CoreFetchSkeletonProps extends VariantProps<typeof coreFetchSkeletonVariants> {}

/**
 *
 *
 * @param {CoreFetchSkeletonProps}
 * @return {JSX.Element}
 */
export const CoreFetchSkeleton = ({ intent, size }: CoreFetchSkeletonProps): JSX.Element => {
  return <article className={joinTw(coreFetchSkeletonVariants({ intent, size }))}></article>;
};
