import {
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  AuthStatusE,
  useAuth,
} from '@context/AuthContext.tsx';

const useLogOut = () => {
  const { setAuthStatus } = useAuth();

  const logOut = () => {
    localStorage.removeItem('token');
    setAuthStatus(AuthStatusE.SIGNED_OUT);
  };

  return {
    logOut,
  };
};

const useHandleSmallScreenMenuDisplay = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  useEffect(() => {
    const handleClick = (event: Event) => {
      if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
        return;
      }

      setIsNavbarOpen(false);
    };

    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref]);

  return {
    ref,
    toggleMenu,
    isNavbarOpen,
  };
};

export {
  useLogOut,
  useHandleSmallScreenMenuDisplay,
};
