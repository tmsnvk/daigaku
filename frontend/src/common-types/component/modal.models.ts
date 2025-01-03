/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { RefObject } from 'react';

/**
 * Defines the base properties of various modal controlling interfaces.
 */
interface BaseModal {
  /**
   * Indicates whether the modal is currently visible.
   */
  isModalVisible: boolean;
}

/**
 * Defines the properties of the {@link useModalControl} custom hook.
 */
export interface ModalControl extends BaseModal {
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
 * Defines the properties of the {@link useModalToggle} custom hook.
 */
export interface ModalToggle extends BaseModal {
  /**
   * Toggles the modal's visibility.
   */
  toggleModal: () => void;
}

/**
 * Defines the properties of the {@link useRenderModal} custom hook.
 */
export interface RenderModal {
  /**
   * A ref object that is attached to the modal component to control its visibility.
   */
  dialogRef: RefObject<HTMLDialogElement | null>;
}
