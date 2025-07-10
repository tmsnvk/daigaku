/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* component imports */
import { type ToastVariantIntent } from '@daigaku/components/common/notification';

/**
 * Defines the properties of a newly created Toast element.
 */
export interface Toast {
  /**
   * The Toast's id.
   */
  readonly id: string;

  /**
   * The Toast's title.
   */
  readonly title: string;

  /**
   * The Toast's description.
   */
  readonly description: string;

  /**
   * The Toast's style matching the component's style intent.
   */
  readonly variantIntent: ToastVariantIntent;

  /**
   * The number of seconds while the Toast is visible on the screen. If not provided, it defaults to the provider's
   * default value.
   */
  readonly autoRemoveDelay: number;
}
