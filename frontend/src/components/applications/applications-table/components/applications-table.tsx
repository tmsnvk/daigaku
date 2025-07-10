/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* logic imports */
import { useGetApplications } from '@daigaku/hooks';
import { isEmpty } from '@daigaku/utilities';
import { useSortOrder } from '../hooks/use-sort-order.tsx';

/* component imports */
import { DataRows } from './data-rows.tsx';
import { TableHeader } from './table-header.tsx';

/* interface, type imports */
import { Application } from '@daigaku/common-types';
import { Column } from '../../common/types.ts';

/**
 * Defines the component's properties.
 */
interface ApplicationsTableProps {
  /**
   *
   */
  readonly initialApplications: Application[];

  /**
   *
   */
  readonly columns: Array<Column>;

  /**
   *
   */
  toggleModal: () => void;
}

/**
 *
 *
 * @param {ApplicationsTableProps}
 * @return {JSX.Element}
 */
export const ApplicationsTable = ({
  initialApplications,
  columns,
  toggleModal,
}: ApplicationsTableProps): JSX.Element => {
  const { data: applications, refetch } = useGetApplications(initialApplications);
  const { handleColumnSort } = useSortOrder(applications as Array<Application>);

  return (
    <table className={'table-fixed text-center'}>
      <thead>
        <TableHeader
          columns={columns}
          isDataEmpty={isEmpty(applications)}
          onColumnSort={handleColumnSort}
          onToggleModal={toggleModal}
          onRefetch={refetch}
        />
      </thead>
      <tbody>
        {applications && (
          <DataRows
            columns={columns}
            applications={applications}
          />
        )}
      </tbody>
    </table>
  );
};
