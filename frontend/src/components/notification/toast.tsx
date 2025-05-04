/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { type VariantProps, cva } from 'class-variance-authority';
import { JSX, useEffect, useState } from 'react';

/* configuration, utilities, constants imports */
import { joinTw } from '@daigaku/utilities';

/* interface, type, enum imports */
import { CreateToast } from '@daigaku/common-types';

const toastVariants = cva(
  joinTw('core-primary-border animate-simple-fade-in', 'flex flex-col', 'w-120', 'p-6', 'border-2'),
  {
    variants: {
      intent: {
        success: joinTw('bg-accent', 'text-secondary'),
        destructive: joinTw(''),
      },
    },
  },
);

/**
 * Defines the component's properties.
 */
interface ToastProps extends Omit<CreateToast, 'intent'>, VariantProps<typeof toastVariants> {
  /**
   *
   */
  removeDelay: number;
}

/**
 * Renders a pop-up toast dialog as a feedback to the user.
 *
 * @param {ToastProps} props
 * @return {JSX.Element | null}
 */
export const Toast = ({ title, description, removeDelay, intent }: ToastProps): JSX.Element | null => {
  const [progressBar, setProgressBar] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgressBar((prevState) => {
        if (prevState < 100) {
          return prevState + 100 / (removeDelay / 10);
        }

        clearInterval(timer);

        return 100;
      });
    }, 10);

    return () => {
      clearInterval(timer);
    };
  }, [removeDelay]);

  return (
    <section className={joinTw(toastVariants({ intent }))}>
      <h3 className={joinTw('mb-4', 'text-3xl font-semibold uppercase')}>{title}</h3>
      <p className={joinTw('text-xl')}>{description}</p>
      <div className={joinTw('relative', 'mt-4')}>
        <div
          className={joinTw('absolute left-0 top-0', 'h-2', 'bg-secondary')}
          style={{
            width: `${progressBar}%`,
            transition: 'width 0.01s linear',
          }}
        ></div>
      </div>
    </section>
  );
};
