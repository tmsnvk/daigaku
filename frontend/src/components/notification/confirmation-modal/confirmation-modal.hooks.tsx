import {
  RefObject,
  useEffect,
  useRef,
} from 'react';

export interface DisplayModalHook {
  dialogRef: RefObject<HTMLDialogElement>;
}

const useDisplayModal = (isVisible: boolean) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialogRef.current?.open && !isVisible) {
      dialogRef.current?.close();
    }

    if (!dialogRef.current?.open && isVisible) {
      dialogRef.current?.showModal();
    }
  }, [isVisible]);

  return {
    dialogRef,
  };
};

export {
  useDisplayModal,
};
