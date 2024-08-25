/**
 * @prettier
 */

import { RefObject, useEffect, useRef } from 'react';

export interface DisplayModal {
  dialogRef: RefObject<HTMLDialogElement>;
}

export const useDisplayModal = (isVisible: boolean): DisplayModal => {
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
