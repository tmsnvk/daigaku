/**
 * @prettier
 */

/* external imports */
import { RefObject, useEffect, useRef } from 'react';

/* interfaces, types, enums */
export interface RenderModal {
  dialogRef: RefObject<HTMLDialogElement>;
}

/*
 * custom hook - TODO - add functionality description
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
