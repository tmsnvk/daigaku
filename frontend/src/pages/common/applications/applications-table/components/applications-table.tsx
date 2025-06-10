/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

/* logic imports */
import { useGetApplications } from '@daigaku/hooks';
import { useSortOrder } from '../hooks/use-sort-order.tsx';

/* component imports */
import { CoreLoadingNotification } from '@daigaku/components/core';
import { GlobalErrorModal } from '@daigaku/components/notification';
import { DataRows } from './data-rows.tsx';
import { TableHeader } from './table-header.tsx';

/* configuration, utilities, constants imports */
import { isEmpty, joinTw } from '@daigaku/utilities';

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
export const ApplicationsTable = ({ columns, toggleModal }: ApplicationsTableProps): JSX.Element => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { data: applications, isLoading, refetch, isRefetching, isError } = useGetApplications();
  const { handleColumnSort } = useSortOrder(applications as Array<Application>);

  if (isLoading || isRefetching) {
    return <CoreLoadingNotification intent={'light'} />;
  }

  if (isError) {
    return (
      <GlobalErrorModal
        isVisible={isError}
        errorText={t('unexpectedGlobalError')}
        onCloseModal={() => {
          navigate('/');
        }}
      />
    );
  }

  return (
    <table className={joinTw('table-fixed', 'text-center')}>
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
