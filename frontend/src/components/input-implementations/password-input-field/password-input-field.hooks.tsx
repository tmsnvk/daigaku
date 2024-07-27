import { useState } from 'react';

export interface RevealPasswordHook {
  isRevealed: boolean;
  toggleRevealIcon: () => void;
}

const useRevealPassword = (): RevealPasswordHook => {
  const [isRevealed, setIsRevealed] = useState<boolean>(false);

  const toggleRevealIcon = (): void => {
    setIsRevealed(!isRevealed);
  };

  return {
    isRevealed,
    toggleRevealIcon,
  };
};

export {
  useRevealPassword,
};
