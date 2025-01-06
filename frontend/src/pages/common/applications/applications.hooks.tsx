/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { useState } from 'react';

/* configuration, utilities, constants imports */
import { queryClient, queryKeys } from '@configuration';
import { localStorageKeys } from '@constants';
import { getLocalStorageObjectById, setLocalStorageObjectById } from '@utilities';

/* interface, type, enum imports */
import { Application } from '@common-types';
import { ApplicationField, Column, ColumnConfig, ColumnVisibility, SetOrder, SortOrder } from './applications.models';

/**
 * Manages the visibility of columns in the Applications page's table.
 *
 * @return {ColumnVisibility}
 */
export const useColumnVisibility = (): ColumnVisibility => {
  const defaultColumnConfig: ColumnConfig = {
    applicationStatus: true,
    interviewStatus: false,
    offerStatus: false,
    responseStatus: false,
    finalDestinationStatus: false,
  };
  const columnConfig: ColumnConfig = getLocalStorageObjectById<ColumnConfig>(
    localStorageKeys.APPLICATION_TABLE_COLUMNS,
    defaultColumnConfig,
  );

  const [columns, setColumns] = useState<Array<Column>>([
    {
      id: 'courseName',
      name: ApplicationField.COURSE,
      isCoreColumn: true,
      isVisible: true,
    },
    {
      id: 'university',
      name: ApplicationField.UNIVERSITY,
      isCoreColumn: true,
      isVisible: true,
    },
    {
      id: 'country',
      name: ApplicationField.COUNTRY,
      isCoreColumn: true,
      isVisible: true,
    },
    {
      id: 'programmeLength',
      name: ApplicationField.PROGRAMME_LENGTH,
      isCoreColumn: true,
      isVisible: true,
    },
    {
      id: 'applicationStatus',
      name: ApplicationField.APPLICATION_STATUS,
      isCoreColumn: false,
      isVisible: columnConfig.applicationStatus ?? true,
    },
    {
      id: 'interviewStatus',
      name: ApplicationField.INTERVIEW_STATUS,
      isCoreColumn: false,
      isVisible: columnConfig.interviewStatus ?? false,
    },
    {
      id: 'offerStatus',
      name: ApplicationField.OFFER_STATUS,
      isCoreColumn: false,
      isVisible: columnConfig.offerStatus ?? false,
    },
    {
      id: 'responseStatus',
      name: ApplicationField.RESPONSE_STATUS,
      isCoreColumn: false,
      isVisible: columnConfig.responseStatus ?? false,
    },
    {
      id: 'finalDestinationStatus',
      name: ApplicationField.FINAL_DESTINATION_STATUS,
      isCoreColumn: false,
      isVisible: columnConfig.finalDestinationStatus ?? false,
    },
  ]);

  const toggleColumnVisibility = (id: string): void => {
    setColumns((previousColumns: Array<Column>) =>
      previousColumns.map((column: Column) => {
        if (column.id === id) {
          const updatedColumnConfig: ColumnConfig = { ...columnConfig, [column.id]: !column.isVisible };

          setLocalStorageObjectById(localStorageKeys.APPLICATION_TABLE_COLUMNS, updatedColumnConfig);

          return { ...column, isVisible: !column.isVisible };
        }

        return column;
      }),
    );
  };

  return {
    columns,
    toggleColumnVisibility,
  };
};

/**
 * Manages the sorting of data rows in the Applications page's table.
 *
 * @return {SetOrder}
 */
export const useSortOrder = (data: Array<Application>): SetOrder => {
  const [sortedField, setSortedField] = useState<string>('courseName');
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.DESC);

  const sortColumns = (): void => {
    const sortedData: Array<Application> = data.sort((a, b) => {
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

    queryClient.setQueryData([queryKeys.application.GET_ALL_BY_ROLE], [...sortedData]);
  };

  const handleColumnSort = (columnId: string): void => {
    const order: SortOrder = sortOrder === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC;

    setSortedField(columnId);
    setSortOrder(order);

    sortColumns();
  };

  return {
    handleColumnSort,
  };
};
