import { useState } from 'react';

const useRevealPassword = () => {
  const [isRevealed, setIsRevealed] = useState<boolean>(false);

  const handleRevealClick = () => {
    setIsRevealed(!isRevealed);
  };

  return {
    isRevealed,
    handleRevealClick,
  };
};

export {
  useRevealPassword,
};
