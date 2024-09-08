/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 */

/* component, style imports */
import { Dialog } from './column-selector-modal.styles';

/* logic imports */
import { ToggleColumnSelectorModal, useToggleColumnSelectorModal } from './column-selector-modal.hooks';

/* interface, type, enum imports */
import { Column } from '../../applications.hooks';

/**
 * ===============
 * Component {@link ColumnSelectorModal}
 * ===============
 */

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
              id={column.id}
              name={column.id}
              checked={column.isVisible}
              disabled={column.isCoreColumn}
              readOnly
            />
            {column.name}
          </article>
        );
      })}
      <button
        type={'button'}
        id={'modal-toggle'}
        name={'modal-toggle'}
        onClick={() => toggleModal()}
      >
        Close
      </button>
    </Dialog>
  );
};
