/**
 * @prettier
 */

import { useState } from 'react';
import { QueryClient } from '@tanstack/react-query';

import { queryKeys } from '@configuration';
import { getLocalStorageObjectById, setLocalStorageObjectById } from '@utilities/local-storage.utilities';

import { Application } from '@common-types';

export interface Column {
  readonly id: string;
  readonly name: string;
  readonly isCoreColumn: boolean;
  readonly isActive: boolean;
}

export interface SetColumns {
  columns: Array<Column>;
  updateColumnVisibility: (id: string) => void;
}

export const useSetColumns = (): SetColumns => {
  const columnVisibility = getLocalStorageObjectById('applications-table-columns');

  const [columns, setColumns] = useState<Array<Column>>([
    { id: 'courseName', name: 'Course', isCoreColumn: true, isActive: true },
    { id: 'university', name: 'University', isCoreColumn: true, isActive: true },
    { id: 'country', name: 'Country', isCoreColumn: true, isActive: true },
    {
      id: 'applicationStatus',
      name: 'Application Status',
      isCoreColumn: false,
      isActive: columnVisibility.applicationStatus ?? true,
    },
    {
      id: 'interviewStatus',
      name: 'Interview Status',
      isCoreColumn: false,
      isActive: columnVisibility.interviewStatus ?? false,
    },
    { id: 'offerStatus', name: 'Offer Status', isCoreColumn: false, isActive: columnVisibility.offerStatus ?? false },
    {
      id: 'responseStatus',
      name: 'Response Status',
      isCoreColumn: false,
      isActive: columnVisibility.responseStatus ?? false,
    },
    {
      id: 'finalDestinationStatus',
      name: 'Final Destination Status',
      isCoreColumn: false,
      isActive: columnVisibility.finalDestinationStatus ?? false,
    },
  ]);

  const updateColumnVisibility = (id: string): void => {
    setColumns(
      columns.map((column) => {
        if (column.id === id) {
          columnVisibility[column.id] = !column.isActive;
          setLocalStorageObjectById('applications-table-columns', columnVisibility);

          return { ...column, isActive: !column.isActive };
        }

        return column;
      }),
    );
  };

  return {
    columns,
    updateColumnVisibility,
  };
};

export interface DisplayColumnSelectorModal {
  isModalVisible: boolean;
  toggleModal: () => void;
}

export const useDisplayColumnSelectorModal = (): DisplayColumnSelectorModal => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const toggleModal = (): void => {
    setIsModalVisible(!isModalVisible);
  };

  return {
    isModalVisible,
    toggleModal,
  };
};

enum SortOrder {
  ASC,
  DESC,
}

export interface SetOrder {
  handleColumnSort: (columnId: string) => void;
}

export const useSetOrder = (data: Array<Application>): SetOrder => {
  const [sortedField, setSortedField] = useState<string>('courseName');
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.DESC);

  const sortColumns = (): void => {
    const queryClient = new QueryClient();

    const sortedData = data.sort((a, b) => {
      if (a[sortedField as keyof Application] === null) {
        return 1;
      }

      if (b[sortedField as keyof Application] === null) {
        return -1;
      }

      return (
        String(a[sortedField as keyof Application]).localeCompare(String(b[sortedField as keyof Application])) *
        (sortOrder === SortOrder.ASC ? 1 : -1)
      );
    });

    queryClient.setQueryData([queryKeys.APPLICATION.GET_ALL_BY_ROLE], [...sortedData]);
  };

  const handleColumnSort = (columnId: string): void => {
    const order = sortOrder === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC;

    setSortedField(columnId);
    setSortOrder(order);

    sortColumns();
  };

  return {
    handleColumnSort,
  };
};
