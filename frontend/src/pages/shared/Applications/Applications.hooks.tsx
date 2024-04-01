import { useState } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { queryKeys } from '@configuration';
import { ApplicationT } from '@hooks/applications/useGetApplications.tsx';

export type ColumnT = {
  id: string;
  name: string;
  isCoreColumn: boolean;
  isActive: boolean;
}

const useSetColumns = () => {
  const [columns, setColumns] = useState<ColumnT[]>([
    { id: 'courseName', name: 'Course', isCoreColumn: true, isActive: true },
    { id: 'university', name: 'University', isCoreColumn: true, isActive: true },
    { id: 'country', name: 'Country', isCoreColumn: true, isActive: true },
    { id: 'applicationStatus', name: 'Application Status', isCoreColumn: false, isActive: true },
    { id: 'interviewStatus', name: 'Interview Status', isCoreColumn: false, isActive: false },
    { id: 'offerStatus', name: 'Offer Status', isCoreColumn: false, isActive: false },
    { id: 'responseStatus', name: 'Response Status', isCoreColumn: false, isActive: false },
    { id: 'finalDestinationStatus', name: 'Final Destination Status', isCoreColumn: false, isActive: false },
  ]);

  const updateColumnVisibility = (id: string) => {
    setColumns(columns.map((column) => {
      if (column.id === id) {
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

const useShowColumnDisplayModal = () => {
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

  const sortColumns = (columnId: string) => {
    const queryClient = new QueryClient();

    const sorted = data.sort((a, b) => {
      if (a[columnId as keyof ApplicationT] === null) {
        return 1;
      }

      if (b[columnId as keyof ApplicationT] === null) {
        return -1;
      }

      return a[sortedField].localeCompare(b[sortedField]) * (sortOrder === SortOrderE.ASC ? 1 : -1);
    });

    queryClient.setQueryData(
      [queryKeys.getApplications],
      [...sorted],
    );
  };

  const handleColumnSort = (columnId: string) => {
    const order = sortOrder === SortOrderE.ASC ? SortOrderE.DESC : SortOrderE.ASC;

    setSortedField(columnId);
    setSortOrder(order);

    sortColumns(columnId);
  };

  return {
    handleColumnSort,
  };
};

export {
  useSetColumns,
  useShowColumnDisplayModal,
  useSetOrder,
};
