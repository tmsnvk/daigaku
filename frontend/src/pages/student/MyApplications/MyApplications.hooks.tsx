import { useState } from 'react';

export type ColumnT = {
  id: number;
  name: string;
  isActive: boolean;
}

const useSetColumns = () => {
  const [columns, setColumns] = useState<ColumnT[]>([
    { id: 0, name: 'Course', isActive: true },
    { id: 1, name: 'University', isActive: true },
    { id: 2, name: 'Country', isActive: true },
    { id: 3, name: 'Application Status', isActive: true },
    { id: 4, name: 'Interview Status', isActive: true },
    { id: 5, name: 'Offer Status', isActive: true },
    { id: 6, name: 'Response Status', isActive: true },
    { id: 7, name: 'Final Destination Status', isActive: true },
  ]);

  const updateColumnVisibility = (id: number) => {
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
