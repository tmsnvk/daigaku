/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { type VariantProps, cva } from 'class-variance-authority';
import { JSX, useEffect, useRef, useState } from 'react';

/* component imports */
import { CoreIcon } from '@daigaku/components/core';

/* configuration, utilities, constants imports */
import { iconLibrary } from '@daigaku/constants';
import { joinTw } from '@daigaku/utilities';

/* interface, type imports */
import { CreateToast } from '@daigaku/common-types';

const toastVariants = cva(joinTw('animate-simple-fade-in', 'flex flex-col', 'w-120', 'p-6', 'border-2'), {
  variants: {
    intent: {
      success: joinTw('core-primary-border', 'bg-accent', 'text-secondary'),
      destructive: joinTw('core-primary-border', 'bg-destructive', 'text-tertiary'),
    },
  },
});

/**
 * A type mimicking the Toast component's intent variant values.
 */
export type ToastVariantIntent = VariantProps<typeof toastVariants>['intent'];

/**
 * Defines the component's properties.
 */
interface ToastProps extends CreateToast, VariantProps<typeof toastVariants> {
  /**
   * The automatic toast removal delay in ms.
   */
  readonly autoRemoveDelay: number;

  /**
   * The handling method running the REMOVE_TOAST action type.
   */
  onClose: () => void;
}

/**
 * Renders a pop-up toast dialog with some information as a feedback to the user.
 *
 * @param {ToastProps} props
 * @return {JSX.Element | null}
 */
export const Toast = ({
  title,
  description,
  variantIntent,
  autoRemoveDelay,
  onClose,
}: ToastProps): JSX.Element | null => {
  const [progressBar, setProgressBar] = useState<number>(0);
  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const updateProgressBar = (timestamp: number): void => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const percent = Math.min((elapsed / autoRemoveDelay) * 100, 100);

      setProgressBar(percent);

      if (percent < 100) {
        animationFrameRef.current = requestAnimationFrame(updateProgressBar);
      }
    };

    animationFrameRef.current = requestAnimationFrame(updateProgressBar);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [autoRemoveDelay]);

  return (
    <article className={joinTw(toastVariants({ intent: variantIntent }))}>
      <div className={joinTw('flex items-center justify-between', 'mb-4')}>
        <h3 className={'text-2xl font-bold uppercase'}>{title}</h3>
        <CoreIcon
          icon={iconLibrary.faXMark}
          className={'cursor-pointer'}
          onClick={onClose}
        />
      </div>
      <p className={'text-xl'}>{description}</p>
      <div className={joinTw('relative', 'mt-4')}>
        <div
          className={joinTw('absolute left-0 top-0', 'h-2', 'bg-secondary')}
          style={{
            width: `${progressBar}%`,
          }}
        ></div>
      </div>
    </article>
  );
};
