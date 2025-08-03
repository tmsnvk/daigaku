/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* logic imports */
import { useRenderModal } from '@daigaku/hooks';
import { joinTw } from '@daigaku/utilities';

/* interface, type imports */
import { Column } from '../../common/types.ts';

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
  readonly isVisible: boolean;

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
 * Renders the column selector modal component that lets users to choose which data columns they wish to see on the
 * page.
 *
 * @returns {JSX.Element}
 */
export const ColumnSelectorModal = ({
  columns,
  isVisible,
  onToggleColumnVisibility,
  onToggle,
}: ColumnSelectorModalProps): JSX.Element => {
  const { dialogRef } = useRenderModal(isVisible);

  return (
    <dialog
      className={'core-primary-border mx-auto mt-[10%] flex flex-col items-start px-20 py-10'}
      ref={dialogRef}
    >
      {columns.map((column: Column) => {
        return (
          <article
            className={'mt-6 flex flex-row'}
            key={column.id}
            onClick={() => !column.isCoreColumn && onToggleColumnVisibility(column.id)}
          >
            <input
              readOnly
              checked={column.isVisible}
              className={joinTw('mr-4', 'hover:outline-none', 'focus:outline-none')}
              disabled={column.isCoreColumn}
              id={column.id}
              name={column.id}
              type={'checkbox'}
            />
            {column.name}
          </article>
        );
      })}
      <button
        className={joinTw(
          'border-accent rounded-(--default-border-radius) mx-auto mt-10 cursor-pointer border-2 bg-transparent px-10 py-4 font-extrabold',
          'hover:text-accent',
        )}
        id={'modal-toggle'}
        name={'modal-toggle'}
        type={'button'}
        onClick={onToggle}
      >
        Close
      </button>
    </dialog>
  );
};
