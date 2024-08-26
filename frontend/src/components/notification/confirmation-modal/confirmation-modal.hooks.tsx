/**
 * @prettier
 */

import { RefObject, useEffect, useRef } from 'react';

export interface RenderModal {
  dialogRef: RefObject<HTMLDialogElement>;
}

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
