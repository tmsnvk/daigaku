/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* component imports */
import { type ToastVariantIntent } from '@daigaku/components/notification';

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
   * The toast's style matching the component's style intent.
   */
  readonly variantIntent: ToastVariantIntent;

  /**
   * The number of seconds while the toast is visible on the screen. If not provided, it defaults to the provider's
   * default value.
   */
  readonly autoRemoveDelay?: number;
}
