/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { Context, JSX, ReactNode, createContext, useContext, useMemo, useReducer } from 'react';

/* logic imports */
import { generateSimpleId, joinTw } from '@daigaku/utilities';
import { ToastActionTypes, initialReducerState, toastReducer } from './toast.reducer';

/* component imports */
import { Toast as ToastComponent } from '@daigaku/components/notification';

/* interface, type imports */
import { Toast } from '@daigaku/common-types';
import { ToastState } from './toast.types';

/**
 * Defines the ToastContext object.
 */
interface ToastContextValue {
  /**
   * The list of toast elements currently in the context.
   */
  state: ToastState;

  /**
   * The toast creating method.
   */
  createToast: (options: Omit<Toast, 'id'>) => void;
}

/**
 * Defines the ToastProvider context provider.
 */
interface ToastProviderProps {
  /**
   * Children elements to render within the provider.
   */
  children: ReactNode;
}

const ToastContext: Context<ToastContextValue> = createContext<ToastContextValue>({} as ToastContextValue);

const AUTO_REMOVE_DELAY = 3000;

/**
 * Defines the application's toast-related context object.
 */
export const ToastProvider = ({ children }: ToastProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(toastReducer, initialReducerState);

  const createToast = (options: Omit<Toast, 'id'>): void => {
    const id = generateSimpleId();
    const newToast = { ...options, id, autoRemoveDelay: options.autoRemoveDelay ?? AUTO_REMOVE_DELAY };

    dispatch({
      type: ToastActionTypes.CREATE,
      payload: {
        toast: newToast,
      },
    });

    setTimeout(() => {
      dispatch({
        type: ToastActionTypes.REMOVE,
        payload: {
          id,
        },
      });
    }, newToast.autoRemoveDelay);
  };

  const removeToast = (id: string): void => {
    const doesExist = state.toasts.some((toast: Toast): boolean => {
      return toast.id === id;
    });

    if (doesExist) {
      dispatch({
        type: ToastActionTypes.REMOVE,
        payload: {
          id,
        },
      });
    }
  };

  const toastContextValues = useMemo(
    () => ({
      state,
      createToast,
    }),
    [state, createToast, removeToast],
  );

  return (
    <ToastContext value={toastContextValues}>
      {children}

      <section className={joinTw('z-100 fixed bottom-10 right-20 flex flex-col gap-4')}>
        {state.toasts.map((toast: Toast) => {
          return (
            <ToastComponent
              key={toast.id}
              id={toast.id}
              title={toast.title}
              description={toast.description}
              variantIntent={toast.variantIntent}
              autoRemoveDelay={toast.autoRemoveDelay ?? AUTO_REMOVE_DELAY}
              onClose={() => removeToast(toast.id)}
            />
          );
        })}
      </section>
    </ToastContext>
  );
};

/**
 * The ToastContext object is wrapped in a simple custom hook for simple usage.
 */
export const useToastProvider = (): ToastContextValue => useContext(ToastContext);
