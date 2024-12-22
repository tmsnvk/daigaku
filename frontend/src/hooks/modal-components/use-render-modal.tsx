/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { RefObject, useEffect, useRef } from 'react';

/**
 * Defines the properties of the {@link useRenderModal} custom hook.
 */
export interface RenderModal {
  /**
   * A ref object that is attached to the modal component to control its visibility.
   */
  dialogRef: RefObject<HTMLDialogElement | null>;
}

/**
 * Manages the visibility of various modal components.
 *
 * @param isVisible A boolean indicating whether the modal should be visible.
 * @return {RenderModal}
 */
export const useRenderModal = (isVisible: boolean): RenderModal => {
  // Create a ref for the modal dialog.
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    // Close the modal if it is open and visibility is set to false.
    if (dialogRef.current?.open && !isVisible) {
      dialogRef.current?.close();
    }

    // Show the modal if it is closed and visibility is set to true.
    if (!dialogRef.current?.open && isVisible) {
      dialogRef.current?.showModal();
    }
  }, [isVisible]);

  return {
    dialogRef,
  };
};
