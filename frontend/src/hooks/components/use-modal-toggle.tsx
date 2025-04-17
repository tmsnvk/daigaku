/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { useState } from 'react';

/* interface, type, enum imports */
import { ModalToggle } from '@daigaku/common-types';

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
