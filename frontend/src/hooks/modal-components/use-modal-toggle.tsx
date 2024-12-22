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
 * Defines the properties of the {@link useModalToggle} custom hook.
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
