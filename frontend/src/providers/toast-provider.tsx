/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { Context, JSX, ReactNode, createContext, useCallback, useContext, useMemo, useReducer } from 'react';
import { match } from 'ts-pattern';

/* component imports */
import { Toast } from '@daigaku/components/notification';

/* configuration, utilities, constants imports */
import { generateSimpleId, joinTw } from '@daigaku/utilities';

/* interface, type imports */
import { CreateToast } from '@daigaku/common-types';

/**
 * The toast action type enum values.
 */
const ToastActionTypes = {
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
    toast: CreateToast;
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

const AUTO_REMOVE_DELAY = 3000;

/**
 * Defines the application's toast-related context object.
 */
export const ToastProvider = ({ children }: ToastProviderProps): JSX.Element => {
  const [toasts, dispatch] = useReducer(toastReducer, initialReducerState);

  const createToast = useCallback((options: Omit<CreateToast, 'id'>): void => {
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
  }, []);

  const removeToast = useCallback((id: string): void => {
    const doesExist = toasts.some((toast: CreateToast): boolean => {
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
  }, []);

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
