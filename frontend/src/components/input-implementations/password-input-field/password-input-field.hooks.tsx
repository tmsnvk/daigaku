/**
 * @prettier
 */

import { useState } from 'react';

export interface RevealPassword {
  isRevealed: boolean;
  toggleRevealIcon: () => void;
}

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
