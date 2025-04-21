/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { RefObject, useEffect, useRef } from 'react';

/**
 * Defines the properties for rendering a modal.
 */
export interface RenderModal {
  /**
   * A ref object attached to the modal component to control its visibility.
   */
  readonly dialogRef: RefObject<HTMLDialogElement | null>;
}

/**
 * Manages the rendering of various modal components.
 *
 * @param isVisible A boolean indicating whether the modal should be rendered on the user's screen.
 * @return {RenderModal}
 */
export const useRenderModal = (isVisible: boolean): RenderModal => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialogRef.current?.open && !isVisible) {
      dialogRef.current?.close();
    }

    if (!dialogRef.current?.open && isVisible) {
      dialogRef.current?.showModal();
    }
  }, [isVisible]);

  return {
    dialogRef,
  };
};
