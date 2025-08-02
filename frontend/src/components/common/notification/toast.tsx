/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { type VariantProps, cva } from 'class-variance-authority';
import { JSX, useEffect, useRef, useState } from 'react';

/* logic imports */
import { joinTw } from '@daigaku/utilities';

/* component imports */
import { CoreIcon } from '@daigaku/components/common/core';

/* configuration, constants imports */
import { iconLibrary } from '@daigaku/constants';

/* interface, type imports */
import { Toast as ToastType } from '@daigaku/common-types';

const toastVariants = cva('animate-simple-fade-in flex flex-col w-120 p-6 border-2', {
  variants: {
    intent: {
      success: 'core-primary-border bg-accent text-secondary',
      destructive: 'core-primary-border bg-destructive text-tertiary',
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
interface ToastProps extends ToastType, VariantProps<typeof toastVariants> {
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
      <div className={'mb-4 flex items-center justify-between'}>
        <h3 className={'text-2xl font-bold uppercase'}>{title}</h3>
        <CoreIcon
          icon={iconLibrary.faXmark}
          className={'cursor-pointer'}
          onClick={onClose}
        />
      </div>
      <p className={'text-xl'}>{description}</p>
      <div className={'relative mt-4'}>
        <div
          className={'bg-secondary absolute left-0 top-0 h-2'}
          style={{
            width: `${progressBar}%`,
          }}
        ></div>
      </div>
    </article>
  );
};
