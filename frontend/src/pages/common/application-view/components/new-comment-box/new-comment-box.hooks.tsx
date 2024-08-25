/**
 * @prettier
 */

import { useMutation } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';

import { commentService } from '@services/index';

import { mutationKeys, queryClient, queryKeys } from '@configuration';

export interface NewCommentFormFields {
  readonly commentContent: string;
}

interface NewCommentForm {
  setError: UseFormSetError<NewCommentFormFields>;
  applicationUuid: string;
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

export const useSubmitNewComment = ({ setError, applicationUuid }: NewCommentForm) => {
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
