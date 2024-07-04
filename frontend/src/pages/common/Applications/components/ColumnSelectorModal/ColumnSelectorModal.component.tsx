import {
  useEffect,
  useRef,
} from 'react';

import { Dialog } from './ColumnSelectorModal.styles.ts';

import { ColumnT } from '../../Applications.hooks.tsx';

type ComponentPropsT = {
  columns: ColumnT[];
  handleColumnVisibility: (id: string) => void;
  isModalVisible: boolean;
  toggleModal: () => void;
}

const ColumnSelectorModal = ({
  columns,
  handleColumnVisibility,
  isModalVisible,
  toggleModal,
}: ComponentPropsT) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialogRef.current?.open && !isModalVisible) {
      dialogRef.current?.close();
    }

    if (!dialogRef.current?.open && isModalVisible) {
      dialogRef.current?.showModal();
    }
  }, [isModalVisible]);

  return (
    <Dialog ref={dialogRef}>
      {columns.map((element) => {
        return (
          <article
            key={element.id}
            onClick={() => !element.isCoreColumn && handleColumnVisibility(element.id)}
          >
            <input
              type={'checkbox'}
              checked={element.isActive}
              disabled={element.isCoreColumn}
              readOnly
            />
            {element.name}
          </article>
        );
      })}
      <button
        type={'button'}
        onClick={toggleModal}
      >
        Close
      </button>
    </Dialog>
  );
};

export default ColumnSelectorModal;
