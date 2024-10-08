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
import { useState } from 'react';

/**
 * ===============
 * Custom Hook {@link useModalControl}
 * ===============
 */

/* interfaces, types, enums */
export interface ModalControl {
  isModalVisible: boolean;
  showModal: () => void;
  closeModal: () => void;
}

/**
 * @description
 * The custom hook manages the display of modal components that have separate show and close actions.
 *
 * @returns {ModalControl}
 * An object containing:
 * - `isModalVisible` (boolean) - The current visibility state of the modal.
 * - `showModal` (function) - A function to set the modal as visible.
 * - `closeModal` (function) - A function to hide the modal.
 *
 * @since 0.0.1
 */
export const useModalControl = (): ModalControl => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const showModal = (): void => {
    setIsModalVisible(true);
  };

  const closeModal = (): void => {
    setIsModalVisible(false);
  };

  return {
    isModalVisible,
    showModal,
    closeModal,
  };
};
