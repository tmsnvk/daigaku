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

/**
 * Defines the properties of the {@link useModalControl} custom hook.
 *
 * @since 0.0.1
 */
export interface ModalControl {
  /**
   * Indicates whether the modal is currently visible.
   */
  isModalVisible: boolean;

  /**
   * Shows the modal.
   */
  showModal: () => void;

  /**
   * Hides the modal.
   */
  closeModal: () => void;
}

/**
 * Manages modal visibility, providing methods to show or hide the modal.
 *
 * @returns {ModalControl}
 *
 * @since 0.0.1
 */
export const useModalControl = (): ModalControl => {
  // Tracks the modal's visibility state.
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const showModal = (): void => {
    // Sets the modal as visible.
    setIsModalVisible(true);
  };

  const closeModal = (): void => {
    // Sets the modal as hidden.
    setIsModalVisible(false);
  };

  return {
    isModalVisible,
    showModal,
    closeModal,
  };
};
