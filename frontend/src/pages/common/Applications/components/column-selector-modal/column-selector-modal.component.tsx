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

/* logic imports */
import { useRenderModal } from '@hooks/index';

/* component, style imports */
import { Dialog } from './column-selector-modal.styles';

/* interface, type, enum imports */
import { RenderModal } from '@hooks/modal-components/use-render-modal';
import { Column } from '../../applications.hooks';

/**
 * ===============
 * Component {@link ColumnSelectorModal}
 * ===============
 */

/**
 * The interface represents the properties of the {@link ColumnSelectorModal} component.
 *
 * @since 0.0.1
 */
interface ComponentProps {
  readonly columns: Array<Column>;
  readonly onToggleColumnVisibility: (id: string) => void;
  readonly isModalVisible: boolean;
  readonly onToggle: () => void;
}

/**
 * The component renders the column selector modal that lets users to choose which data columns they wish to view on the page.
 *
 * @returns {JSX.Element}
 *
 * @since 0.0.1
 */
export const ColumnSelectorModal = ({ columns, onToggleColumnVisibility, isModalVisible, onToggle }: ComponentProps): JSX.Element => {
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
