/**
 * @prettier
 */

/* external imports */
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

/* service imports */
import { commentService } from '@services/index';

/* configuration imports */
import { queryKeys } from '@configuration';

/* interface, type, enum imports */
import { SimpleQueryResult } from '@common-types';
import { CommentMeta } from '@services/comment/comment.service';

/* interfaces, types, enums */
export interface UpdatePagination {
  currentPage: number;
  updatePreviousButton: () => void;
  updateNextButton: (totalPages: number) => void;
}

/*
 * custom hook - TODO - add functionality description
 */
export const useUpdatePagination = (): UpdatePagination => {
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

/*
 * custom hook - TODO - add functionality description
 */
export const useGetCommentsByApplication = (applicationUuid: string, currentPage: number): SimpleQueryResult<CommentMeta> => {
  return useQuery({
    queryKey: [queryKeys.COMMENTS.GET_ALL_BY_APPLICATION_UUID, applicationUuid, currentPage],
    queryFn: () => commentService.getAllByApplicationUUid(applicationUuid, currentPage),
  });
};
