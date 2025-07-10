/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* logic imports */
import { useModalToggle } from '@daigaku/hooks';
import { useColumnVisibility } from './applications-page.hooks';

/* component imports */
import { ApplicationsTable } from './applications-table';
import { ColumnSelectorModal } from './column-selector-modal';

/* interface, type imports */
import { Application } from '@daigaku/common-types';

/**
 *
 */
interface ApplicationsIndexProps {
  /**
   *
   */
  readonly initialApplications: Array<Application>;
}

/**
 *
 * @returns {JSX.Element}
 */
export const ApplicationsIndex = ({ initialApplications }: ApplicationsIndexProps): JSX.Element => {
  const { columns, toggleColumnVisibility } = useColumnVisibility();
  const { isModalVisible, toggleModal } = useModalToggle();

  return (
    <main className={'core-primary-border mx-auto my-[5%] flex w-[95%] flex-col text-xl'}>
      <ApplicationsTable
        initialApplications={initialApplications}
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
