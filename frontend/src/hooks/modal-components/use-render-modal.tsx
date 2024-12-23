/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { useEffect, useRef } from 'react';

/* interface, type, enum imports */
import { RenderModal } from '@common-types';

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
