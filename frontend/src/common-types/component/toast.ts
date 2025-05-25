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
 * A type mimicking the Toast component's intent variant values.
 */
export type ToastVariantIntent = VariantProps<typeof toastVariants>['intent'];

/**
 * Defines the properties of a newly created toast element.
 */
export interface CreateToast {
  /**
   * The toast's id.
   */
  readonly id: string;

  /**
   * The toast's title.
   */
  readonly title: string;

  /**
   * The toast's description.
   */
  readonly description: string;

  /**
   * The toast's style based on the component's style intent.
   */
  readonly variantIntent: ToastVariantIntent;

  /**
   * The number of seconds while the toast is visible on the screen. If not provided, it defaults to the provider's
   * default value.
   */
  readonly autoRemoveDelay?: number;
}
