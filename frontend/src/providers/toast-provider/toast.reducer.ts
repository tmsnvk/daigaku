/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { match } from 'ts-pattern';

/* interface, type imports */
import { Toast } from '@daigaku/common-types';
import { ToastState } from './toast.types';

/**
 * The toast action type enum values.
 */
export const ToastActionTypes = {
  CREATE: 'CREATE_TOAST',
  REMOVE: 'REMOVE_TOAST',
} as const;

/**
 * Defines the CREATE_TOAST action type.
 */
interface CreateAction {
  /**
   * The action type.
   */
  type: typeof ToastActionTypes.CREATE;

  /**
   * The payload for toast creation.
   */
  payload: {
    toast: Toast;
  };
}

/**
 * Defines the REMOVE_TOAST action type.
 */
interface RemoveAction {
  /**
   * The action type.
   */
  type: typeof ToastActionTypes.REMOVE;

  /**
   * The payload for toast removal.
   */
  payload: {
    id: string;
  };
}

/**
 * The toast actions' union type.
 */
type ToastAction = CreateAction | RemoveAction;

export const initialReducerState: ToastState = { toasts: [] };

/**
 *
 * @param state
 * @param action
 * @returns
 */
export const toastReducer = (state: ToastState, action: ToastAction): ToastState => {
  return match<ToastAction, ToastState>(action)
    .with({ type: ToastActionTypes.CREATE }, ({ payload }) => {
      return {
        toasts: [payload.toast, ...state.toasts],
      };
    })
    .with({ type: ToastActionTypes.REMOVE }, ({ payload }) => {
      return {
        toasts: state.toasts.filter((toast: Toast) => {
          return toast.id !== payload.id;
        }),
      };
    })
    .exhaustive();
};
