import { useMutation } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';

import { commentService } from '@services/index.ts';

import {
  mutationKeys,
  queryClient,
  queryKeys,
} from '@configuration';

export type NewCommentFormFieldsT = {
  commentContent: string;
}

type NewCommentFormT = {
  setError: UseFormSetError<NewCommentFormFieldsT>;
  applicationUuid: string;
};

type NewCommentFormErrorFieldsT =
  `root.${string}` |
  'root' |
  'commentContent';

type NewCommentFormErrorT = {
  response: {
    status: number;
    data: {
      [key: string]: NewCommentFormErrorFieldsT;
    }
  }
}

const useSubmitNewComment = ({ setError, applicationUuid }: NewCommentFormT) => {
  return useMutation({
    mutationKey: [mutationKeys.COMMENTS.POST_COMMENT_BY_APPLICATION],
    mutationFn: (data: NewCommentFormFieldsT) => commentService.postComment(data, applicationUuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.COMMENTS.GET_ALL_BY_APPLICATION_UUID, applicationUuid] });
    },
    onError: (error: NewCommentFormErrorT) => {
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

export {
  useSubmitNewComment,
};
