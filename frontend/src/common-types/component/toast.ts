/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/**
 *
 */
export type ToastIntent = 'success' | 'destructive';

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
