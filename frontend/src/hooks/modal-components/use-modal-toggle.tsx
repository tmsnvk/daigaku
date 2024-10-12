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
 * Custom Hook {@link useModalToggle}
 * ===============
 */

/**
 * The interface represents the properties of the {@link useModalToggle} custom hook.
 *
 * @since 0.0.1
 */
export interface ModalToggle {
  isModalVisible: boolean;
  toggleModal: () => void;
}

/**
 * The custom hook manages the display of modal components that have a single toggle action.
 *
 * @returns {ModalControl} An object containing:
 * - `isModalVisible` The current visibility state of the modal.
 * - `toggleModal` A function to toggle the modal.
 *
 * @since 0.0.1
 */
export const useModalToggle = (): ModalToggle => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const toggleModal = (): void => {
    setIsModalVisible(!isModalVisible);
  };

  return {
    isModalVisible,
    toggleModal,
  };
};
