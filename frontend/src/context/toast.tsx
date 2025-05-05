/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { Context, JSX, ReactNode, createContext, useContext, useMemo, useReducer } from 'react';
import { match } from 'ts-pattern';

/* component imports */
import { Toast } from '@daigaku/components/notification';

/* configuration, utilities, constants imports */
import { generateId, joinTw } from '@daigaku/utilities';

/* interface, type, enum imports */
import { CreateToast } from '@daigaku/common-types';

const ToastActionTypes = {
  CREATE_TOAST: 'CREATE_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
} as const;

interface CreateToastAction {
  type: typeof ToastActionTypes.CREATE_TOAST;
  payload: {
    toast: CreateToast;
  };
}

interface RemoveToastAction {
  type: typeof ToastActionTypes.REMOVE_TOAST;
  payload: {
    id: string;
  };
}

type ToastAction = CreateToastAction | RemoveToastAction;

const toastReducer = (state: Array<CreateToast>, action: ToastAction): Array<CreateToast> => {
  return match<ToastAction, Array<CreateToast>>(action)
    .with({ type: ToastActionTypes.CREATE_TOAST }, ({ payload }) => {
      return [...state, payload.toast];
    })
    .with({ type: ToastActionTypes.REMOVE_TOAST }, ({ payload }) => {
      return state.filter((toast: CreateToast) => {
        return toast.id !== payload.id;
      });
    })
    .exhaustive();
};

/**
 * Defines the properties of the ToastContext context object.
 */
interface ToastContextValue {
  /**
   * The list of toast elements currently in the context.
   */
  toasts: Array<CreateToast>;

  /**
   * The toast creating method.
   */
  createToast: (options: Omit<CreateToast, 'id'>) => void;

  /**
   * The toast removing method.
   */
  removeToast: (id: string) => void;
}

interface ToastProviderProps {
  /**
   * Children elements to render within the provider.
   */
  children: ReactNode;

  /**
   * Auto-removal delay in ms, defaults to 3000ms.
   */
  autoRemoveDelay?: number;
}

const ToastContext: Context<ToastContextValue> = createContext<ToastContextValue>({} as ToastContextValue);
const initialState: Array<CreateToast> = [];

/**
 * Defines the application's toast-related context object.
 */
export const ToastProvider = ({ children, autoRemoveDelay = 3000 }: ToastProviderProps): JSX.Element => {
  const [toasts, dispatch] = useReducer(toastReducer, initialState);

  const toastContextValues = useMemo(() => {
    const scheduleToastRemoval = (id: string): void => {
      setTimeout(() => {
        dispatch({
          type: ToastActionTypes.REMOVE_TOAST,
          payload: { id },
        });
      }, autoRemoveDelay);
    };

    const createToast = (options: Omit<CreateToast, 'id'>): void => {
      const id = generateId();
      const newToast = { ...options, id };

      dispatch({
        type: ToastActionTypes.CREATE_TOAST,
        payload: { toast: newToast },
      });

      scheduleToastRemoval(id);
    };

    const removeToast = (id: string): void => {
      const doesToastExist = toasts.some((toast: CreateToast): boolean => {
        return toast.id === id;
      });

      if (doesToastExist) {
        dispatch({
          type: ToastActionTypes.REMOVE_TOAST,
          payload: { id },
        });
      }
    };

    return {
      toasts,
      createToast,
      removeToast,
    };
  }, [toasts, autoRemoveDelay]);

  return (
    <ToastContext value={toastContextValues}>
      {children}

      <div className={joinTw('z-100 fixed bottom-10 right-10 flex flex-col-reverse gap-4')}>
        {toasts.map((toast: CreateToast) => {
          return (
            <Toast
              key={toast.id}
              {...toast}
              onClose={() => toastContextValues.removeToast(toast.id)}
              removeDelay={autoRemoveDelay}
            />
          );
        })}
      </div>
    </ToastContext>
  );
};

/**
 * The ToastContext object is wrapped in a simple custom hook for simpler usage.
 */
export const useToastContext = (): ToastContextValue => useContext(ToastContext);
