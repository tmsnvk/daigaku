import { useState } from 'react';

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

export {
  useSetColumns,
  useShowColumnDisplayModal,
};
