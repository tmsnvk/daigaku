/**
 * @prettier
 */

import { Dialog } from './column-selector-modal.styles';

import { Column } from '../../applications.hooks';
import { ToggleColumnSelectorModal, useToggleColumnSelectorModal } from './column-selector-modal.hooks';

interface ComponentProps {
  readonly columns: Array<Column>;
  readonly handleColumnVisibility: (id: string) => void;
  readonly isModalVisible: boolean;
  readonly toggleModal: () => void;
}

export const ColumnSelectorModal = ({
  columns,
  handleColumnVisibility,
  isModalVisible,
  toggleModal,
}: ComponentProps) => {
  const { dialogRef }: ToggleColumnSelectorModal = useToggleColumnSelectorModal(isModalVisible);

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
