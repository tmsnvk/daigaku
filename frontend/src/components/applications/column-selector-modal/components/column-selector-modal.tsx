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
      ref={dialogRef}
      className={joinTw('core-primary-border', 'flex flex-col items-start', 'mx-auto mt-[10%] px-20 py-10')}
    >
      {columns.map((column: Column) => {
        return (
          <article
            key={column.id}
            className={joinTw('flex flex-row', 'mt-6')}
            onClick={() => !column.isCoreColumn && onToggleColumnVisibility(column.id)}
          >
            <input
              type={'checkbox'}
              id={column.id}
              name={column.id}
              className={joinTw('mr-4', 'hover:outline-none', 'focus:outline-none')}
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
          'mx-auto mt-10 px-10 py-4',
          'border-accent border-2 bg-transparent',
          'rounded-(--default-border-radius) cursor-pointer',
          'font-extrabold',
          'hover:text-accent',
        )}
        onClick={onToggle}
      >
        Close
      </button>
    </dialog>
  );
};
