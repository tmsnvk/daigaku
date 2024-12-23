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

/* interface, type, enum imports */
import { ModalControl } from '@common-types';

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
