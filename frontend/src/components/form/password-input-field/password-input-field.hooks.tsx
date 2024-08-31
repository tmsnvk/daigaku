/**
 * @prettier
 */

/* external imports */
import { useState } from 'react';

/* interfaces, types, enums */
export interface RevealPassword {
  isRevealed: boolean;
  toggleRevealIcon: () => void;
}

/*
 * custom hook - TODO - add functionality description
 */
export const useRevealPassword = (): RevealPassword => {
  const [isRevealed, setIsRevealed] = useState<boolean>(false);

  const toggleRevealIcon = (): void => {
    setIsRevealed(!isRevealed);
  };

  return {
    isRevealed,
    toggleRevealIcon,
  };
};
