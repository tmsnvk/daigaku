import { useQuery } from '@tanstack/react-query';
import { commentService } from '@services/index.ts';
import { queryKeys } from '@configuration';

const useGetCommentsByApplication = (applicationUuid: string) => {
  return useQuery({
    queryKey: [queryKeys.COMMENTS.GET_ALL_BY_APPLICATION_UUID],
    queryFn: () => commentService.getAllByApplicationUUid(applicationUuid),
  });
};

export {
  useGetCommentsByApplication,
};
