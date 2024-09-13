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
import { Application, ApplicationFieldsE } from '@common-types';
import { APPLICATION_TABLE_COLUMNS } from '@constants';

/**
 * ===============
 * Custom Hook {@link useColumnVisibility}
 * ===============
 */

/* interfaces, types, enums */
interface ColumnConfig {
  applicationStatus: boolean;
  interviewStatus: boolean;
  offerStatus: boolean;
  responseStatus: boolean;
  finalDestinationStatus: boolean;
}

export interface Column {
  readonly id: string;
  readonly name: string;
  readonly isCoreColumn: boolean;
  readonly isVisible: boolean;
}

export interface ColumnVisibility {
  columns: Array<Column>;
  toggleColumnVisibility: (id: string) => void;
}

/**
 * @description
 * The custom hook manages the visibility of columns in the Applications page's table.
 *
 * @returns {ColumnVisibility}
 * An object containing:
 * - `columns` - The current column configuratio
 * - `toggleColumnVisibility` - A function to toggle column visibility.
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
  const columnConfig: ColumnConfig = getLocalStorageObjectById<ColumnConfig>(APPLICATION_TABLE_COLUMNS, defaultColumnConfig);

  const [columns, setColumns] = useState<Array<Column>>([
    { id: 'courseName', name: ApplicationFieldsE.COURSE, isCoreColumn: true, isVisible: true },
    { id: 'university', name: ApplicationFieldsE.UNIVERSITY, isCoreColumn: true, isVisible: true },
    { id: 'country', name: ApplicationFieldsE.COUNTRY, isCoreColumn: true, isVisible: true },
    {
      id: 'applicationStatus',
      name: ApplicationFieldsE.APPLICATION_STATUS,
      isCoreColumn: false,
      isVisible: columnConfig.applicationStatus ?? true,
    },
    {
      id: 'interviewStatus',
      name: ApplicationFieldsE.INTERVIEW_STATUS,
      isCoreColumn: false,
      isVisible: columnConfig.interviewStatus ?? false,
    },
    { id: 'offerStatus', name: ApplicationFieldsE.OFFER_STATUS, isCoreColumn: false, isVisible: columnConfig.offerStatus ?? false },
    {
      id: 'responseStatus',
      name: ApplicationFieldsE.RESPONSE_STATUS,
      isCoreColumn: false,
      isVisible: columnConfig.responseStatus ?? false,
    },
    {
      id: 'finalDestinationStatus',
      name: ApplicationFieldsE.FINAL_DESTINATION_STATUS,
      isCoreColumn: false,
      isVisible: columnConfig.finalDestinationStatus ?? false,
    },
  ]);

  const toggleColumnVisibility = (id: string): void => {
    setColumns((previousColumns: Array<Column>) =>
      previousColumns.map((column: Column) => {
        if (column.id === id) {
          const updatedColumnConfig: ColumnConfig = { ...columnConfig, [column.id]: !column.isVisible };

          setLocalStorageObjectById(APPLICATION_TABLE_COLUMNS, updatedColumnConfig);

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

/* interfaces, types, enums */
export interface SetOrder {
  handleColumnSort: (columnId: string) => void;
}

enum SortOrder {
  ASC,
  DESC,
}

/**
 * @description
 * The custom hook manages the sorting of data rows in the Applications page's table.
 *
 * @returns {SetOrder}
 * An object containing:
 * - `handleColumnSort` - A function that manages the sorting updates.
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
