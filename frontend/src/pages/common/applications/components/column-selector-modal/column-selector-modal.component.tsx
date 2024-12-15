/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
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
 * Defines the properties of the {@link ColumnSelectorModal} component.
 *
 * @since 0.0.1
 */
interface ComponentProps {
  /**
   * An array of columns that are available for selection in the modal.
   */
  readonly columns: Array<Column>;

  /**
   * A function that toggles the visibility of a column when a checkbox is clicked.
   */
  readonly onToggleColumnVisibility: (id: string) => void;

  /**
   * A boolean indicating whether the modal should be visible.
   */
  readonly isModalVisible: boolean;

  /**
   * A function that handles closing the modal.
   */
  readonly onToggle: () => void;
}

/**
 * Renders the column selector modal that lets users to choose which data columns they wish to view on the page.
 *
 * @return {JSX.Element}
 *
 * @since 0.0.1
 */
export const ColumnSelectorModal = ({ columns, onToggleColumnVisibility, isModalVisible, onToggle }: ComponentProps): JSX.Element => {
  // Custom hook that renders the modal.
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
