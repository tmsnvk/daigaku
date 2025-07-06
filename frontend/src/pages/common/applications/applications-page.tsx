/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* logic imports */
import { useModalToggle } from '@daigaku/hooks';
import { joinTw } from '@daigaku/utilities';
import { useColumnVisibility } from './common/hooks/use-column-visibility.tsx';

/* component imports */
import { ApplicationsTable } from './applications-table';
import { ColumnSelectorModal } from './column-selector-modal';

/**
 * Renders, in table format, the list of Applications that the user has authorisation to view.
 * The component displays various buttons and components to interact with the loaded-in data as well.
 *
 * @return {JSX.Element}
 */
export const Applications = (): JSX.Element => {
  const { columns, toggleColumnVisibility } = useColumnVisibility();

  const { isModalVisible, toggleModal } = useModalToggle();

  return (
    <main className={joinTw('core-primary-border', 'flex flex-col', 'w-[95%]', 'mx-auto my-[5%]', 'text-xl')}>
      <ApplicationsTable
        columns={columns}
        toggleModal={toggleModal}
      />
      {isModalVisible && (
        <ColumnSelectorModal
          columns={columns}
          onToggleColumnVisibility={toggleColumnVisibility}
          isVisible={isModalVisible}
          onToggle={toggleModal}
        />
      )}
    </main>
  );
};
