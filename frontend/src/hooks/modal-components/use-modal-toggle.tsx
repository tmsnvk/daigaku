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
import { ModalToggle } from '@common-types';

/**
 * Manages the display of modal components that have a single toggle action.
 *
 * @return {ModalToggle}
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
