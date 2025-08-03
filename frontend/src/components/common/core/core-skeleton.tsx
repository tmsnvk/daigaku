/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { type VariantProps, cva } from 'class-variance-authority';
import { JSX } from 'react';

/* logic imports */
import { joinTw } from '@daigaku/utilities';

const coreSkeletonVariants = cva('animate-pulse blur-sm rounded', {
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
interface CoreSkeletonProps extends VariantProps<typeof coreSkeletonVariants> {}

/**
 *
 *
 * @param {CoreSkeletonProps}
 * @return {JSX.Element}
 */
export const CoreSkeleton = ({ intent, size }: CoreSkeletonProps): JSX.Element => {
  return <article className={joinTw(coreSkeletonVariants({ intent, size }))}></article>;
};
