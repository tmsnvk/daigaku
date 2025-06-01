/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

/* configuration, utilities, constants imports */
import { queryKeys } from '@daigaku/constants';

/* interface, type, enum, schema imports */
import { ApplicationRecord } from '@daigaku/common-types';

/**
 * Defines the properties for sorting columns on the /applications page.
 */
interface SetOrder {
  /**
   * A method handling the sorting updates.
   */
  handleColumnSort: (columnId: string) => void;
}

/**
 * Defines the possible sorting options.
 */
enum SortOrder {
  ASC,
  DESC,
}

/**
 * Manages the sorting of data rows in the /applications page's table.
 *
 * @return {SetOrder}
 */
export const useSortOrder = (data: Array<ApplicationRecord>): SetOrder => {
  const queryClient = useQueryClient();

  const [sortedBy, setSortedBy] = useState<string>('courseName');
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.DESC);

  const sortColumns = (): void => {
    const sortedData: Array<ApplicationRecord> = data.sort((a, b) => {
      if (a[sortedBy as keyof ApplicationRecord] === null) {
        return 1;
      }

      if (b[sortedBy as keyof ApplicationRecord] === null) {
        return -1;
      }

      return (
        String(a[sortedBy as keyof ApplicationRecord]).localeCompare(String(b[sortedBy as keyof ApplicationRecord])) *
        (sortOrder === SortOrder.ASC ? 1 : -1)
      );
    });

    queryClient.setQueryData([queryKeys.application.GET_ALL_BY_ROLE], [...sortedData]);
  };

  const handleColumnSort = (columnId: string): void => {
    const order: SortOrder = sortOrder === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC;

    setSortedBy(columnId);
    setSortOrder(order);

    sortColumns();
  };

  return {
    handleColumnSort,
  };
};
