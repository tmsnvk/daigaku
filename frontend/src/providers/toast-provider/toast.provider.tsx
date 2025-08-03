/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { Context, JSX, ReactNode, createContext, useContext, useMemo, useReducer } from 'react';

/* logic imports */
import { generateSimpleId, joinTw } from '@daigaku/utilities';
import { ToastActionTypes, initialReducerState, toastReducer } from './toast.reducer.ts';

/* component imports */
import { Toast as ToastComponent } from './toast.component.tsx';

/* interface, type imports */
import { CreateToast, Toast, ToastState } from './toast.types.ts';

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
  createToast: (options: CreateToast) => void;
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

  const createToast = ({ autoRemoveDelay = AUTO_REMOVE_DELAY, ...rest }: CreateToast): void => {
    const id = generateSimpleId();
    const newToast: Toast = {
      id,
      autoRemoveDelay,
      ...rest,
    };

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
              autoRemoveDelay={toast.autoRemoveDelay}
              description={toast.description}
              id={toast.id}
              key={toast.id}
              title={toast.title}
              variantIntent={toast.variantIntent}
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
