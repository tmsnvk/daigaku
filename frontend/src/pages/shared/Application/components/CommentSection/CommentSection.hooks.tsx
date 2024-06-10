import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { commentService } from '@services/index.ts';
import { queryKeys } from '@configuration';

const useUpdatePagination = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);

  const updatePreviousButton = () => {
    if (currentPage - 1 >= 0) {
      window.scroll({ top: 0, behavior: 'smooth' });
      setCurrentPage(currentPage - 1);
    }
  };

  const updateNextButton = (totalPages: number) => {
    if (currentPage + 1 < totalPages) {
      window.scroll({ top: 0, behavior: 'auto' });
      setCurrentPage(currentPage + 1);
    }
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
