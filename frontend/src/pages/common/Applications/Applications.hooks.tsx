import { useState } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { queryKeys } from '@configuration';
import {
  getLocalStorageObjectById,
  setLocalStorageObjectById,
} from '@utilities/localStorage.utilities.ts';
import { ApplicationT } from '@services/application/application.service.ts';

export type ColumnT = {
  id: string;
  name: string;
  isCoreColumn: boolean;
  isActive: boolean;
}

const useSetColumns = () => {
  const columnOrder = getLocalStorageObjectById('applications-table-columns');

  const [columns, setColumns] = useState<ColumnT[]>([
    { id: 'courseName', name: 'Course', isCoreColumn: true, isActive: true },
    { id: 'university', name: 'University', isCoreColumn: true, isActive: true },
    { id: 'country', name: 'Country', isCoreColumn: true, isActive: true },
    { id: 'applicationStatus', name: 'Application Status', isCoreColumn: false, isActive: columnOrder.applicationStatus ?? true },
    { id: 'interviewStatus', name: 'Interview Status', isCoreColumn: false, isActive: columnOrder.interviewStatus ?? false },
    { id: 'offerStatus', name: 'Offer Status', isCoreColumn: false, isActive: columnOrder.offerStatus ?? false },
    { id: 'responseStatus', name: 'Response Status', isCoreColumn: false, isActive: columnOrder.responseStatus ?? false },
    { id: 'finalDestinationStatus', name: 'Final Destination Status', isCoreColumn: false, isActive: columnOrder.finalDestinationStatus ?? false },
  ]);

  const updateColumnVisibility = (id: string) => {
    setColumns(columns.map((column) => {
      if (column.id === id) {
        columnOrder[column.id] = !column.isActive;
        setLocalStorageObjectById('applications-table-columns', columnOrder);

        return { ...column, isActive: !column.isActive };
      }

      return column;
    }));
  };

  return {
    columns,
    updateColumnVisibility,
  };
};

const useDisplayColumnSelectorModal = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return {
    isModalVisible,
    toggleModal,
  };
};

enum SortOrderE {
  ASC,
  DESC
}

const useSetOrder = (data: ApplicationT[]) => {
  const [sortedField, setSortedField] = useState<string>('courseName');
  const [sortOrder, setSortOrder] = useState<SortOrderE>(SortOrderE.DESC);

  const sortColumns = () => {
    const queryClient = new QueryClient();

    const sortedData = data.sort((a, b) => {
      if (a[sortedField as keyof ApplicationT] === null) {
        return 1;
      }

      if (b[sortedField as keyof ApplicationT] === null) {
        return -1;
      }

      return String(a[sortedField as keyof ApplicationT]).localeCompare(String(b[sortedField as keyof ApplicationT])) * (sortOrder === SortOrderE.ASC ? 1 : -1);
    });

    queryClient.setQueryData(
      [queryKeys.APPLICATION.GET_ALL_BY_ROLE],
      [...sortedData],
    );
  };

  const handleColumnSort = (columnId: string) => {
    const order = sortOrder === SortOrderE.ASC ? SortOrderE.DESC : SortOrderE.ASC;

    setSortedField(columnId);
    setSortOrder(order);

    sortColumns();
  };

  return {
    handleColumnSort,
  };
};

export {
  useSetColumns,
  useDisplayColumnSelectorModal,
  useSetOrder,
};
