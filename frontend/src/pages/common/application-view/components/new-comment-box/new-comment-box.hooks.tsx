/**
 * @prettier
 */

/* external imports */
import { useMutation } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';

/* service imports */
import { commentService } from '@services/index';

/* configuration imports */
import { mutationKeys, queryClient, queryKeys } from '@configuration';

/* interface, type, enum imports */
import { Comment } from '@services/comment/comment.service';
import { MutationResult } from '@common-types';

/* interfaces, types, enums */
export interface NewCommentFormFields {
  readonly commentContent: string;
}

type NewCommentFormErrorFieldsT = `root.${string}` | 'root' | 'commentContent';

interface NewCommentFormError {
  response: {
    status: number;
    data: {
      [key: string]: NewCommentFormErrorFieldsT;
    };
  };
}

export type SubmitNewComment = MutationResult<Comment, NewCommentFormError, NewCommentFormFields>;

/*
 * custom hook - TODO - add functionality description
 */
export const useSubmitNewComment = (setError: UseFormSetError<NewCommentFormFields>, applicationUuid: string): SubmitNewComment => {
  return useMutation({
    mutationKey: [mutationKeys.COMMENTS.POST_COMMENT_BY_APPLICATION],
    mutationFn: (data: NewCommentFormFields) => commentService.postComment(data, applicationUuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.COMMENTS.GET_ALL_BY_APPLICATION_UUID, applicationUuid] });
    },
    onError: (error: NewCommentFormError) => {
      for (const fieldId in error.response.data) {
        if (error.response.data[fieldId]) {
          setError(fieldId as NewCommentFormErrorFieldsT, { message: error.response.data[fieldId] });
        }
      }

      if (error.response.data.root) {
        setError('root.serverError', { message: error.response.data.root });
      }
    },
  });
};
