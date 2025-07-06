/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { useState } from 'react';

/**
 * Defines the properties for a toggle modal.
 */
interface ModalToggle {
  /**
   * Indicates whether the modal is currently visible.
   */
  readonly isModalVisible: boolean;

  /**
   * Toggles the modal's visibility.
   */
  toggleModal: () => void;
}

/**
 * Manages the display of modal components that have a single toggle action.
 *
 * @return {ModalToggle}
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
