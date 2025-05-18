/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* logic imports */
import { useModalToggle } from '@daigaku/hooks';
import { useColumnVisibility } from './common/hooks/use-column-visibility.tsx';

/* component imports */
import { ApplicationsTable } from './applications-table';
import { ColumnSelectorModal } from './column-selector-modal';

/* configuration, utilities, constants imports */
import { joinTw } from '@daigaku/utilities';

/**
 * Renders, in table format, the list of application records that the user has authorisation to view.
 * The component displays various buttons and components to interact with the loaded-in data as well.
 *
 * @return {JSX.Element}
 */
export const Applications = (): JSX.Element => {
  const { columns, toggleColumnVisibility } = useColumnVisibility();

  const { isModalVisible, toggleModal } = useModalToggle();

  // add student selector dropdown for mentors
  // add mentor and student selector dropdowns for admins
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
