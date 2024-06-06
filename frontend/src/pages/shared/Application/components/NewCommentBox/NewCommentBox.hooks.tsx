import { useMutation } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';
import { commentService } from '@services/index.ts';
import { mutationKeys } from '@configuration';

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
  });
};

export {
  useSubmitNewComment,
};
