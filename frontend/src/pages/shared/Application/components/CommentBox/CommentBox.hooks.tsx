import { useMutation } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';
import { mutationKeys } from '@configuration';
import { applicationService } from '@services/index.ts';

export type NewCommentFormFieldsT = {
  applicationUuid: string;
  accountUuid: string;
  content: string;
}

type NewCommentFormT = {
  setError: UseFormSetError<NewCommentFormFieldsT>;
  applicationUuid: string;
};

const useSubmitNewComment = ({ setError, applicationUuid }: NewCommentFormT) => {
  return useMutation({
    mutationKey: [mutationKeys.APPLICATION.POST_NEW_COMMENT],
    mutationFn: (data: NewCommentFormFieldsT) => applicationService.postNewComment(data, applicationUuid),
  });
};

export {
  useSubmitNewComment,
};
