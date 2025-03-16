/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* logic imports */
import { useRenderModal } from '@hooks';

/* component, style imports */

/* interface, type, enum imports */
import { joinTw } from '@utilities';
import { Column } from '../models';

/**
 * Defines the component's properties.
 */
interface ColumnSelectorModalProps {
  /**
   * The array of columns that are available for selection in the modal.
   */
  readonly columns: Array<Column>;

  /**
   * The boolean indicating whether the modal should be visible.
   */
  readonly isModalVisible: boolean;

  /**
   * The method to toggle the visibility of a column when a checkbox is clicked.
   */
  onToggleColumnVisibility: (id: string) => void;

  /**
   * The method to handle closing the modal.
   */
  onToggle: () => void;
}

/**
 * Renders the column selector modal component that lets users to choose which data columns they wish to view on the page.
 *
 * @return {JSX.Element}
 */
export const ColumnSelectorModal = ({
  columns,
  isModalVisible,
  onToggleColumnVisibility,
  onToggle,
}: ColumnSelectorModalProps): JSX.Element => {
  const { dialogRef } = useRenderModal(isModalVisible);

  return (
    <dialog
      ref={dialogRef}
      className={'base-dark-border flex flex-col items-start px-20 py-10 mt-[10%] mx-auto'}
    >
      {columns.map((column: Column) => {
        return (
          <article
            key={column.id}
            className={'flex flex-row mt-6'}
            onClick={() => !column.isCoreColumn && onToggleColumnVisibility(column.id)}
          >
            <input
              type={'checkbox'}
              id={column.id}
              name={column.id}
              className={'mr-4 focus:outline-none hover:outline-none'}
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
        className={joinTw(
          'mt-10 mx-auto px-10 py-4 bg-transparent font-extrabold border-2 border-solid border-accent rounded-(--default-border-radius) cursor-pointer',
          'hover:text-accent',
        )}
        onClick={onToggle}
      >
        Close
      </button>
    </dialog>
  );
};
