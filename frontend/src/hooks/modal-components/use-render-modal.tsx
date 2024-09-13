/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 */

/* external imports */
import { RefObject, useEffect, useRef } from 'react';

/**
 * ===============
 * Custom Hook {@link useRenderModal}
 * ===============
 */

/* interfaces, types, enums */
export interface RenderModal {
  dialogRef: RefObject<HTMLDialogElement>;
}

/**
 * @description
 * The custom hook manages the visibility of various modal components.
 *
 * @param {boolean} isVisible
 * A boolean indicating whether the modal should be visible.
 *
 * @returns {RenderModal}
 * An object containing:
 *  - `dialogRef` - A ref objcet that should be attached to the modal component to control its visibility.
 *
 * @since 0.0.1
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
