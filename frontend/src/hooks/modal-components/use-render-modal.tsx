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
