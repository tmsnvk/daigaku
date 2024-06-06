import { useMutation } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';
import {
  mutationKeys,
  queryClient,
  queryKeys,
} from '@configuration';
import { commentService } from '@services/index.ts';
import { CommentT } from '@services/comment/comment.service.ts';

export type NewCommentFormFieldsT = {
  commentContent: string;
}

type NewCommentFormT = {
  setError: UseFormSetError<NewCommentFormFieldsT>;
  applicationUuid: string;
};

const useSubmitNewComment = ({ setError, applicationUuid }: NewCommentFormT) => {
  return useMutation({
    mutationKey: [mutationKeys.COMMENTS.POST_COMMENT_BY_APPLICATION],
    mutationFn: (data: NewCommentFormFieldsT) => commentService.postComment(data, applicationUuid),
    onSuccess: (data) => {
      queryClient.setQueryData<CommentT[]>(
        [queryKeys.COMMENTS.GET_ALL_BY_APPLICATION_UUID, applicationUuid],
        (previousData) => {
          if (!previousData) {
            return;
          }

          return [...previousData, data];
        },
      );
    },
  });
};

export {
  useSubmitNewComment,
};
