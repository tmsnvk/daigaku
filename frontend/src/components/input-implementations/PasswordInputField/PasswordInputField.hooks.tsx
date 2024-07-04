import { useState } from 'react';

const useRevealPassword = () => {
  const [isRevealed, setIsRevealed] = useState<boolean>(false);

  const toggleRevealIcon = () => setIsRevealed(!isRevealed);

  return {
    isRevealed,
    toggleRevealIcon,
  };
};

export {
  useRevealPassword,
};
