/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

/* configuration, constants imports */
import { queryKeys } from '@daigaku/constants';

/* interface, type imports */
import { ApplicationResponse } from '@daigaku/common-types';

/**
 * Defines the properties for sorting columns on the /applications page.
 */
interface SetSortingMode {
  /**
   * A method handling the sorting updates.
   */
  handleColumnSort: (columnId: string) => void;
}

/**
 * Defines the possible sorting options.
 */
const SortModes = {
  ASCENDING: 'ASCENDING',
  DESCENDING: 'DESCENDING',
} as const;

type SortMode = (typeof SortModes)[keyof typeof SortModes];

/**
 * Manages the sorting of data rows in the /applications page's table.
 *
 * @return {SetSortingMode}
 */
export const useSortOrder = (data: Array<ApplicationResponse>): SetSortingMode => {
  const queryClient = useQueryClient();

  const [sortedBy, setSortedBy] = useState<string>('courseName');
  const [sortOrder, setSortOrder] = useState<SortMode>(SortModes.DESCENDING);

  const sortColumns = (): void => {
    const sortedData: Array<ApplicationResponse> = data.sort((a, b) => {
      if (a[sortedBy as keyof ApplicationResponse] === null) {
        return 1;
      }

      if (b[sortedBy as keyof ApplicationResponse] === null) {
        return -1;
      }

      return (
        String(a[sortedBy as keyof ApplicationResponse]).localeCompare(
          String(b[sortedBy as keyof ApplicationResponse]),
        ) * (sortOrder === SortModes.ASCENDING ? 1 : -1)
      );
    });

    queryClient.setQueryData([queryKeys.application.GET_ALL_BY_ROLE], [...sortedData]);
  };

  const handleColumnSort = (columnId: string): void => {
    const order: SortMode = sortOrder === SortModes.ASCENDING ? SortModes.DESCENDING : SortModes.ASCENDING;

    setSortedBy(columnId);
    setSortOrder(order);

    sortColumns();
  };

  return {
    handleColumnSort,
  };
};
