/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { useState } from 'react';

/**
 * Defines the properties of the {@link useModalControl} custom hook.
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
