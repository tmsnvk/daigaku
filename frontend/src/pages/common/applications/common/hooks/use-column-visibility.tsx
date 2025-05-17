/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { useState } from 'react';

/* configuration, utilities, constants imports */
import { localStorageKeys } from '@daigaku/constants';
import { getLocalStorageObjectById, setLocalStorageObjectById } from '@daigaku/utilities';

/* interface, type, enum imports */
import { Column } from '../types.ts';

/**
 * Defines the properties for managing column visibility on the /applications page.
 */
interface ColumnVisibility {
  /**
   * The current column configuration.
   */
  readonly columns: Array<Column>;

  /**
   * A method that toggles column visibility.
   */
  toggleColumnVisibility: (id: string) => void;
}

/**
 * Defines the properties of what a single row can display.
 */
interface RowConfig {
  /**
   * The application status's visibility flag.
   */
  readonly applicationStatus: boolean;

  /**
   * The interview status's visibility flag.
   */
  readonly interviewStatus: boolean;

  /**
   * The offer status's visibility flag.
   */
  readonly offerStatus: boolean;

  /**
   * The response status's visibility flag.
   */
  readonly responseStatus: boolean;

  /**
   * The final destination status's visibility flag.
   */
  readonly finalDestinationStatus: boolean;
}

/**
 * Manages the visibility of columns in /applications page's table.
 *
 * @return {ColumnVisibility}
 */
export const useColumnVisibility = (): ColumnVisibility => {
  const defaultRowConfig: RowConfig = {
    applicationStatus: true,
    interviewStatus: false,
    offerStatus: false,
    responseStatus: false,
    finalDestinationStatus: false,
  };
  const rowConfig: RowConfig = getLocalStorageObjectById<RowConfig>(
    localStorageKeys.APPLICATION_TABLE_COLUMNS,
    defaultRowConfig,
  );

  const [columns, setColumns] = useState<Array<Column>>([
    {
      id: 'courseName',
      name: 'Course',
      isCoreColumn: true,
      isVisible: true,
    },
    {
      id: 'university',
      name: 'University',
      isCoreColumn: true,
      isVisible: true,
    },
    {
      id: 'country',
      name: 'Country',
      isCoreColumn: true,
      isVisible: true,
    },
    {
      id: 'programmeLength',
      name: 'Programme Length',
      isCoreColumn: true,
      isVisible: true,
    },
    {
      id: 'applicationStatus',
      name: 'Application Status',
      isCoreColumn: false,
      isVisible: rowConfig.applicationStatus ?? true,
    },
    {
      id: 'interviewStatus',
      name: 'Interview Status',
      isCoreColumn: false,
      isVisible: rowConfig.interviewStatus ?? false,
    },
    {
      id: 'offerStatus',
      name: 'Offer Status',
      isCoreColumn: false,
      isVisible: rowConfig.offerStatus ?? false,
    },
    {
      id: 'responseStatus',
      name: 'Response Status',
      isCoreColumn: false,
      isVisible: rowConfig.responseStatus ?? false,
    },
    {
      id: 'finalDestinationStatus',
      name: 'Final Destination Status',
      isCoreColumn: false,
      isVisible: rowConfig.finalDestinationStatus ?? false,
    },
  ]);

  const toggleColumnVisibility = (id: string): void => {
    setColumns((previousColumns: Array<Column>) =>
      previousColumns.map((column: Column) => {
        if (column.id === id) {
          const updatedColumnConfig: RowConfig = {
            ...rowConfig,
            [column.id]: !column.isVisible,
          };

          setLocalStorageObjectById(localStorageKeys.APPLICATION_TABLE_COLUMNS, updatedColumnConfig);

          return {
            ...column,
            isVisible: !column.isVisible,
          };
        }

        return column;
      }));
  };

  return {
    columns,
    toggleColumnVisibility,
  };
};
