/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { Context, JSX, ReactNode, createContext, useContext, useMemo, useState } from 'react';

/* component imports */
import { Toast } from '@daigaku/components/notification';

/* configuration, utilities, constants imports */
import { generateId, joinTw } from '@daigaku/utilities';

/* interface, type, enum imports */
import { CreateToast, ToastIntent } from '@daigaku/common-types';

const initialState: Array<CreateToast> = [];

/**
 *
 */
interface ToastProps {
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

/**
 * Defines the properties of the ToastContext context object.
 */
interface ToastContext {
  /**
   *
   */
  toasts: Array<CreateToast>;

  /**
   *
   */
  createToast: (options: ToastProps) => void;
}

const ToastContext: Context<ToastContext> = createContext<ToastContext>({} as ToastContext);

const AUTO_REMOVE_DELAY = 500000;

/**
 *
 * @param children
 * @return
 */
export const ToastProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [toasts, setToasts] = useState<Array<CreateToast>>(initialState);

  const removeToast = (id: string) => {
    setToasts((prevState) =>
      prevState.filter((toast) => {
        return toast.id !== id;
      }));
  };

  const createToast = (options: ToastProps): void => {
    const id = generateId();
    const newToast: CreateToast = { id, ...options };

    setToasts((prevState) => {
      return [...prevState, newToast];
    });

    setTimeout(() => {
      removeToast(newToast.id);
    }, AUTO_REMOVE_DELAY);
  };

  const toastContextValues: ToastContext = useMemo(
    () => ({
      toasts,
      createToast,
    }),
    [toasts],
  );

  return (
    <ToastContext value={toastContextValues}>
      {children}

      <div className={joinTw('z-100 fixed bottom-10 right-10 flex flex-col-reverse gap-4')}>
        {toasts.map((toast: CreateToast) => {
          return (
            <Toast
              key={toast.id}
              {...toast}
              removeDelay={AUTO_REMOVE_DELAY}
            />
          );
        })}
      </div>
    </ToastContext>
  );
};

/**
 * The ToastContext object is wrapped into a simple custom hook for simpler usage.
 */
export const useToastContext = (): ToastContext => useContext(ToastContext);
