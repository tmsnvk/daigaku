/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* interface, type imports */
import { type ToastVariantIntent } from './toast.component.tsx';

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

/**
 *
 */
export type ToastState = {
  toasts: Array<Toast>;
};

/**
 *
 */
export type CreateToast = Omit<Toast, 'id' | 'autoRemoveDelay'> & Partial<Pick<Toast, 'autoRemoveDelay'>>;
