/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 */

/* external imports */
import { QueryClient } from '@tanstack/react-query';
import { useState } from 'react';

/* configuration, utilities, constants imports */
import { queryKeys } from '@configuration';
import { getLocalStorageObjectById, setLocalStorageObjectById } from '@utilities/local-storage.utilities';

/* interface, type, enum imports */
import { Application, ApplicationField } from '@common-types';
import { localStorageKeyConstants } from '@constants';

/**
 * ===============
 * Custom Hook {@link useColumnVisibility}
 * ===============
 */

/**
 * The interface represents the properties of what a single column can display.
 *
 * @since 0.0.1
 */
interface ColumnConfig {
  applicationStatus: boolean;
  interviewStatus: boolean;
  offerStatus: boolean;
  responseStatus: boolean;
  finalDestinationStatus: boolean;
}

/**
 * The interface represents the core properties of a single column.
 *
 * @since 0.0.1
 */
export interface Column {
  readonly id: string;
  readonly name: string;
  readonly isCoreColumn: boolean;
  readonly isVisible: boolean;
}

/**
 * The type represents the return value properties of the {@link useColumnVisibility} custom hook.
 *
 * @since 0.0.1
 */
export interface ColumnVisibility {
  columns: Array<Column>;
  toggleColumnVisibility: (id: string) => void;
}

/**
 * @description
 * The custom hook manages the visibility of columns in the Applications page's table.
 *
 * @returns {ColumnVisibility} An object containing:
 * - `columns` The current column configuration.
 * - `toggleColumnVisibility` A function to toggle column visibility.
 *
 * @since 0.0.1
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
    localStorageKeyConstants.APPLICATION_TABLE_COLUMNS,
    defaultColumnConfig,
  );

  const [columns, setColumns] = useState<Array<Column>>([
    { id: 'courseName', name: ApplicationField.COURSE, isCoreColumn: true, isVisible: true },
    { id: 'university', name: ApplicationField.UNIVERSITY, isCoreColumn: true, isVisible: true },
    { id: 'country', name: ApplicationField.COUNTRY, isCoreColumn: true, isVisible: true },
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
    { id: 'offerStatus', name: ApplicationField.OFFER_STATUS, isCoreColumn: false, isVisible: columnConfig.offerStatus ?? false },
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

          setLocalStorageObjectById(localStorageKeyConstants.APPLICATION_TABLE_COLUMNS, updatedColumnConfig);

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
 * ===============
 * Custom Hook {@link useSortOrder}
 * ===============
 */

/**
 * The type represents the return value properties of the {@link useSortOrder} custom hook.
 *
 * @since 0.0.1
 */
export interface SetOrder {
  handleColumnSort: (columnId: string) => void;
}

/**
 * The enum represents the possible sorting options.
 *
 * @since 0.0.1
 */
enum SortOrder {
  ASC,
  DESC,
}

/**
 * @description
 * The custom hook manages the sorting of data rows in the Applications page's table.
 *
 * @returns {SetOrder} An object containing:
 * - `handleColumnSort` A function that manages the sorting updates.
 *
 * @since 0.0.1
 */
export const useSortOrder = (data: Array<Application>): SetOrder => {
  const [sortedField, setSortedField] = useState<string>('courseName');
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.DESC);

  const queryClient: QueryClient = new QueryClient();

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
