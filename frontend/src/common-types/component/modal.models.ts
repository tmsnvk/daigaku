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
  readonly isModalVisible: boolean;
}

/**
 * Defines the control properties for a modal.
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
 * Defines the toggle properties for a modal.
 */
export interface ModalToggle extends BaseModal {
  /**
   * Toggles the modal's visibility.
   */
  toggleModal: () => void;
}

/**
 * Defines the rendering properties for a modal.
 */
export interface RenderModal {
  /**
   * A ref object attached to the modal component to control its visibility.
   */
  readonly dialogRef: RefObject<HTMLDialogElement | null>;
}
