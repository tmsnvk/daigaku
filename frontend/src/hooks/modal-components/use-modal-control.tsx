/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
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
 * @return {ModalControl}
 *
 * @since 0.0.1
 */
export const useModalControl = (): ModalControl => {
  // Tracks the modal's visibility state.
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  // Sets the modal as visible.
  const showModal = (): void => {
    setIsModalVisible(true);
  };

  // Sets the modal as hidden.
  const closeModal = (): void => {
    setIsModalVisible(false);
  };

  return {
    isModalVisible,
    showModal,
    closeModal,
  };
};
