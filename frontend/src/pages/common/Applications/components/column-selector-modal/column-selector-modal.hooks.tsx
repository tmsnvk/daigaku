/**
 * @prettier
 */

/* external imports */
import { RefObject, useEffect, useRef } from 'react';

/* interfaces, types, enums */
export interface ToggleColumnSelectorModal {
  dialogRef: RefObject<HTMLDialogElement>;
}

/*
 * custom hook - TODO - add functionality description
 */
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
