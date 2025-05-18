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

/* interface, type, enum, schema imports */
import { CreateToast } from '@daigaku/common-types';

enum ToastActionTypes {
  CREATE = 'CREATE_TOAST',
  REMOVE = 'REMOVE_TOAST',
}

/**
 * Defines the toast creating action type.
 */
interface CreateToastAction {
  /**
   * The action type.
   */
  type: ToastActionTypes.CREATE;

  /**
   * The payload for toast creation.
   */
  payload: {
    toast: CreateToast;
  };
}

/**
 * Defines the toast removal action type.
 */
interface RemoveToastAction {
  /**
   * The action type.
   */
  type: ToastActionTypes.REMOVE;

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
type ToastAction = CreateToastAction | RemoveToastAction;

/**
 * Defines the ToastContext object.
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
}

/**
 * Defines the ToastProvider context provider.
 */
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

const toastReducer = (state: Array<CreateToast>, action: ToastAction): Array<CreateToast> => {
  return match<ToastAction, Array<CreateToast>>(action)
    .with({ type: ToastActionTypes.CREATE }, ({ payload }) => {
      return [payload.toast, ...state];
    })
    .with({ type: ToastActionTypes.REMOVE }, ({ payload }) => {
      return state.filter((toast: CreateToast) => {
        return toast.id !== payload.id;
      });
    })
    .exhaustive();
};

const ToastContext: Context<ToastContextValue> = createContext<ToastContextValue>({
  toasts: [],
  createToast: () => {},
});
const initialReducerState: Array<CreateToast> = [];

/**
 * Defines the application's toast-related context object.
 */
export const ToastProvider = ({ children, autoRemoveDelay = 3000 }: ToastProviderProps): JSX.Element => {
  const [toasts, dispatch] = useReducer(toastReducer, initialReducerState);

  const createToast = (options: Omit<CreateToast, 'id'>): void => {
    const id = generateId();
    const newToast = { ...options, id };

    dispatch({ type: ToastActionTypes.CREATE, payload: { toast: newToast } });

    setTimeout(() => {
      dispatch({ type: ToastActionTypes.REMOVE, payload: { id } });
    }, autoRemoveDelay);
  };

  const removeToast = (id: string): void => {
    const doesToastExist = toasts.some((toast: CreateToast): boolean => {
      return toast.id === id;
    });

    if (doesToastExist) {
      dispatch({ type: ToastActionTypes.REMOVE, payload: { id } });
    }
  };

  const toastContextValues = useMemo(
    () => ({
      toasts,
      createToast,
    }),
    [toasts, createToast, removeToast],
  );

  return (
    <ToastContext value={toastContextValues}>
      {children}

      <section className={joinTw('z-100 fixed bottom-10 right-20 flex flex-col gap-4')}>
        {toasts.map((toast: CreateToast) => {
          return (
            <Toast
              key={toast.id}
              {...toast}
              onClose={() => removeToast(toast.id)}
              autoRemoveDelay={autoRemoveDelay}
            />
          );
        })}
      </section>
    </ToastContext>
  );
};

/**
 * The ToastContext object is wrapped in a simple custom hook for simpler usage.
 */
export const useToastContext = (): ToastContextValue => useContext(ToastContext);
