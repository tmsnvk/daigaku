/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* interface, type imports */
import { Toast } from '@daigaku/common-types';

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
