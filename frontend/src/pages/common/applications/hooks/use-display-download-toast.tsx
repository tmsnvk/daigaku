/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { useState } from 'react';

/**
 * Defines the properties of the download toast hook.
 */
interface DisplayDownloadToast {
  /**
   * The boolean flag indicating whether the toast component is visible.
   */
  readonly isToastVisible: boolean;

  /**
   * The method activating the component.
   */
  displayDownloadToast: () => void;

  /**
   * The method deactivating the component.
   */
  handleAnimationEnd: () => void;
}

/**
 * Manages a toast component popping up after the download .pdf request button was clicked.
 *
 * @return {DisplayDownloadToast}
 */
export const useDisplayDownloadToast = (): DisplayDownloadToast => {
  const [isToastVisible, setIsToastVisible] = useState<boolean>(false);

  const displayDownloadToast = (): void => {
    setIsToastVisible(true);
  };

  const handleAnimationEnd = (): void => {
    setIsToastVisible(false);
  };

  return {
    isToastVisible,
    displayDownloadToast,
    handleAnimationEnd,
  };
};
