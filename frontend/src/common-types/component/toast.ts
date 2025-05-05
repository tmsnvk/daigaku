/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { VariantProps } from 'class-variance-authority';

/* component imports */
import { toastVariants } from '@daigaku/components/notification';

/**
 *
 */
export type ToastIntent = VariantProps<typeof toastVariants>['intent'];

/**
 *
 */
export interface CreateToast {
  /**
   *
   */
  readonly id: string;

  /**
   *
   */
  readonly title: string;

  /**
   *
   */
  readonly description: string;

  /**
   *
   */
  readonly intent: ToastIntent;
}
