/**
 * @prettier
 */

/* component, style imports */
import { Dialog } from './column-selector-modal.styles';

/* logic imports */
import { ToggleColumnSelectorModal, useToggleColumnSelectorModal } from './column-selector-modal.hooks';

/* interface, type, enum imports */
import { Column } from '../../applications.hooks';

/* interfaces, types, enums */
interface ComponentProps {
  readonly columns: Array<Column>;
  readonly handleColumnVisibility: (id: string) => void;
  readonly isModalVisible: boolean;
  readonly toggleModal: () => void;
}

/*
 * custom component - TODO - add functionality description
 */
export const ColumnSelectorModal = ({ columns, handleColumnVisibility, isModalVisible, toggleModal }: ComponentProps) => {
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
