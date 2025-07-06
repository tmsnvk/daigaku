/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { createFileRoute } from '@tanstack/react-router';
import { JSX } from 'react';

/* logic imports */
import { useModalToggle } from '@daigaku/hooks';
import { joinTw } from '@daigaku/utilities';

/* component imports */
import { ApplicationsTable, ColumnSelectorModal, useColumnVisibility } from '@daigaku/components/applications';

/**
 *
 * @returns {JSX.Element}
 */
const ApplicationsIndexComponent = (): JSX.Element => {
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

export const Route = createFileRoute('/applications/')({
  component: ApplicationsIndexComponent,
});
