/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { type VariantProps, cva } from 'class-variance-authority';
import { JSX, useEffect, useState } from 'react';

/* component imports */
import { CoreIcon } from '@daigaku/components/core';

/* configuration, utilities, constants imports */
import { iconLibraryConfig } from '@daigaku/configuration';
import { joinTw } from '@daigaku/utilities';

/* interface, type, enum imports */
import { CreateToast } from '@daigaku/common-types';

export const toastVariants = cva(joinTw('animate-simple-fade-in', 'flex flex-col', 'w-120', 'p-6', 'border-2'), {
  variants: {
    intent: {
      success: joinTw('core-primary-border', 'bg-accent', 'text-secondary'),
      destructive: joinTw('bg-destructive', 'text-tertiary'),
    },
  },
});

/**
 * Defines the component's properties.
 */
interface ToastProps extends Omit<CreateToast, 'intent'>, VariantProps<typeof toastVariants> {
  /**
   *
   */
  onClose: () => void;

  /**
   *
   */
  readonly removeDelay: number;
}

/**
 * Renders a pop-up toast dialog as a feedback to the user.
 *
 * @param {ToastProps} props
 * @return {JSX.Element | null}
 */
export const Toast = ({ title, description, onClose, removeDelay, intent }: ToastProps): JSX.Element | null => {
  const [progressBar, setProgressBar] = useState<number>(0);

  useEffect(() => {
    const intervalDuration = 10;
    const progressIncrement = 100 / (removeDelay / intervalDuration);

    const timer = setInterval(() => {
      setProgressBar((prevState: number) => {
        const newProgress = prevState + progressIncrement;

        return Math.min(newProgress, 100);
      });
    }, intervalDuration);

    return () => {
      clearInterval(timer);
    };
  }, [removeDelay]);

  return (
    <section className={joinTw(toastVariants({ intent }))}>
      <div className={joinTw('flex items-center justify-between', 'mb-4')}>
        <h3 className={joinTw('text-2xl font-bold uppercase')}>{title}</h3>
        <CoreIcon
          icon={iconLibraryConfig.faXMark}
          onClick={onClose}
          className={joinTw('cursor-pointer')}
        />
      </div>
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
