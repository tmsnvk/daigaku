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
import { useRenderModal } from '@hooks/index';

/* interface, type, enum imports */
import { RenderModal } from '@hooks/modal-components/use-render-modal';
import { Column } from '../../applications.hooks';

/**
 * ===============
 * Component {@link ColumnSelectorModal}
 * ===============
 */

/* interfaces, types, enums */
interface ComponentProps {
  readonly columns: Array<Column>;
  readonly onToggleColumnVisibility: (id: string) => void;
  readonly isModalVisible: boolean;
  readonly onToggle: () => void;
}

/*
 * custom component - TODO - add functionality description
 */
export const ColumnSelectorModal = ({ columns, onToggleColumnVisibility, isModalVisible, onToggle }: ComponentProps) => {
  const { dialogRef }: RenderModal = useRenderModal(isModalVisible);

  return (
    <Dialog ref={dialogRef}>
      {columns.map((column: Column) => {
        return (
          <article
            key={column.id}
            onClick={() => !column.isCoreColumn && onToggleColumnVisibility(column.id)}
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
        onClick={onToggle}
      >
        Close
      </button>
    </Dialog>
  );
};
