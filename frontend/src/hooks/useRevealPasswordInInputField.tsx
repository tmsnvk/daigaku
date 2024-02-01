import { useState } from 'react';

const useRevealPasswordInInputField = () => {
  const [isRevealed, setIsRevealed] = useState<boolean>(false);

  const handleRevealClick = () => {
    setIsRevealed(!isRevealed);
  };

  return {
    isRevealed,
    handleRevealClick,
  };
};

export default useRevealPasswordInInputField;
