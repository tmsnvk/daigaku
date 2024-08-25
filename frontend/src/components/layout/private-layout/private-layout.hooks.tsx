/**
 * @prettier
 */

import { MouseEvent, useRef, useState } from 'react';

export interface HandleSmallScreenMenuDisplayHook {
  ref: React.MutableRefObject<HTMLDivElement | null>;
  toggleMenu: () => void;
  isNavbarOpen: boolean;
  handleInsideClick: (event: MouseEvent<HTMLDivElement>) => void;
  handleOutsideClick: () => void;
}

export const useHandleSmallScreenMenuDisplay = (): HandleSmallScreenMenuDisplayHook => {
  const [isNavbarOpen, setIsNavbarOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const toggleMenu = (): void => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const handleInsideClick = (event: MouseEvent<HTMLDivElement>): void => {
    if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
      return;
    }

    setIsNavbarOpen(false);
  };

  const handleOutsideClick = (): void => {
    setIsNavbarOpen(false);
  };

  return {
    ref,
    toggleMenu,
    isNavbarOpen,
    handleInsideClick,
    handleOutsideClick,
  };
};
