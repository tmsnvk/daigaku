import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { commentService } from '@services/index';

import { queryKeys } from '@configuration';

export interface UpdatePagination {
  currentPage: number;
  updatePreviousButton: () => void;
  updateNextButton: (totalPages: number) => void;
}

const useUpdatePagination = (): UpdatePagination => {
  const [currentPage, setCurrentPage] = useState<number>(0);

  const updatePreviousButton = (): void => {
    currentPage - 1 >= 0 && setCurrentPage(currentPage - 1);
  };

  const updateNextButton = (totalPages: number): void => {
    currentPage + 1 < totalPages && setCurrentPage(currentPage + 1);
  };

  return {
    currentPage,
    updatePreviousButton,
    updateNextButton,
  };
};

const useGetCommentsByApplication = (applicationUuid: string, currentPage: number) => {
  return useQuery({
    queryKey: [queryKeys.COMMENTS.GET_ALL_BY_APPLICATION_UUID, applicationUuid, currentPage],
    queryFn: () => commentService.getAllByApplicationUUid(applicationUuid, currentPage),
  });
};

export {
  useUpdatePagination,
  useGetCommentsByApplication,
};
