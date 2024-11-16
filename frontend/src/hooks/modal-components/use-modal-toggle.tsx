/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

/* external imports */
import { useState } from 'react';

/**
 * ===============
 * Custom Hook {@link useModalToggle}
 * ===============
 */

/**
 * Defines the properties of the {@link useModalToggle} custom hook.
 *
 * @since 0.0.1
 */
export interface ModalToggle {
  /**
   * Indicates whether the modal is currently visible.
   */
  isModalVisible: boolean;

  /**
   * Toggles the modal's visibility.
   */
  toggleModal: () => void;
}

/**
 * Manages the display of modal components that have a single toggle action.
 *
 * @return {ModalControl}
 *
 * @since 0.0.1
 */
export const useModalToggle = (): ModalToggle => {
  // Tracks the modal's visibility state.
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  // Toggles the modal's visibility.
  const toggleModal = (): void => {
    setIsModalVisible(!isModalVisible);
  };

  return {
    isModalVisible,
    toggleModal,
  };
};
