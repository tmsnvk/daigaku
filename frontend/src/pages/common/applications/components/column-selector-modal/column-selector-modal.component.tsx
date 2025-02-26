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
import { Column } from '../../applications.models';

/**
 * Defines the component's properties.
 */
interface ComponentProps {
  /**
   * The array of columns that are available for selection in the modal.
   */
  readonly columns: Array<Column>;

  /**
   * The method to toggle the visibility of a column when a checkbox is clicked.
   */
  onToggleColumnVisibility: (id: string) => void;

  /**
   * The boolean indicating whether the modal should be visible.
   */
  readonly isModalVisible: boolean;

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
export const ColumnSelectorModal = ({ columns, onToggleColumnVisibility, isModalVisible, onToggle }: ComponentProps): JSX.Element => {
  const { dialogRef } = useRenderModal(isModalVisible);

  return (
    <dialog
      ref={dialogRef}
      className={'base-dark-border flex flex-col items-start px-[7.5rem] py-[5rem] mt-[10%] mx-auto'}
    >
      {columns.map((column: Column) => {
        return (
          <article
            key={column.id}
            className={'flex flex-row mt-[1.5rem]'}
            onClick={() => !column.isCoreColumn && onToggleColumnVisibility(column.id)}
          >
            <input
              type={'checkbox'}
              id={column.id}
              name={column.id}
              className={'mr-[1.5rem] focus:outline-none hover:outline-none'}
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
        className={
          'mt-[5rem] mx-auto px-[2.5rem] py-[1rem] bg-transparent font-extrabold border-[0.2rem] border-solid border-(--color-indian-yellow) rounded-(--default-border-radius) cursor-pointer hover:text-(--color-indian-yellow)'
        }
        onClick={onToggle}
      >
        Close
      </button>
    </dialog>
  );
};
