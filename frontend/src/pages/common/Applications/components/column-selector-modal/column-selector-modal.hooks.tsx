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
 * Custom Hook {@link useToggleColumnSelectorModal}
 * ===============
 */

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
