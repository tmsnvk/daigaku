import {
  useEffect,
  useRef,
} from 'react';

import { Dialog } from './column-selector-modal.styles';

import { Column } from '../../applications.hooks';

interface ComponentProps {
  readonly columns: Array<Column>;
  readonly handleColumnVisibility: (id: string) => void;
  readonly isModalVisible: boolean;
  readonly toggleModal: () => void;
}

const ColumnSelectorModal = ({
  columns,
  handleColumnVisibility,
  isModalVisible,
  toggleModal,
}: ComponentProps) => {
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
      {columns.map((column: Column) => {
        return (
          <article
            key={column.id}
            onClick={() => !column.isCoreColumn && handleColumnVisibility(column.id)}
          >
            <input
              type={'checkbox'}
              checked={column.isActive}
              disabled={column.isCoreColumn}
              readOnly
            />
            {column.name}
          </article>
        );
      })}
      <button
        type={'button'}
        onClick={() => toggleModal()}
      >
        Close
      </button>
    </Dialog>
  );
};

export default ColumnSelectorModal;
