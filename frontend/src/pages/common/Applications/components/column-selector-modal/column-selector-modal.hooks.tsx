/**
 * @prettier
 */

import { RefObject, useEffect, useRef } from 'react';

export interface ToggleColumnSelectorModal {
  dialogRef: RefObject<HTMLDialogElement>;
}

export const useToggleColumnSelectorModal = (isModalVisible: boolean): ToggleColumnSelectorModal => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialogRef.current?.open && !isModalVisible) {
      dialogRef.current?.close();
    }

    if (!dialogRef.current?.open && isModalVisible) {
      dialogRef.current?.showModal();
    }
  }, [isModalVisible]);

  return {
    dialogRef,
  };
};
