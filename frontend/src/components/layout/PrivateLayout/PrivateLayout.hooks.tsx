import {
  MouseEvent,
  useRef,
  useState,
} from 'react';

const useHandleSmallScreenMenuDisplay = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => setIsNavbarOpen(!isNavbarOpen);

  const handleInsideClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
      return;
    }

    setIsNavbarOpen(false);
  };

  const handleOutsideClick = () => setIsNavbarOpen(false);

  return {
    ref,
    toggleMenu,
    isNavbarOpen,
    handleInsideClick,
    handleOutsideClick,
  };
};

export {
  useHandleSmallScreenMenuDisplay,
};
