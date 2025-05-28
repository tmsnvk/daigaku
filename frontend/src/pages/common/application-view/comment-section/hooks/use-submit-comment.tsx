/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

/* logic imports */
import { commentService } from '@daigaku/services';
import { FormValidationError, ServerError, UnauthorizedError, UnexpectedError } from '@daigaku/errors';
import { useToastContext } from '@daigaku/context';

/* configuration, utilities, constants imports */
import { mutationKeys, queryKeys } from '@daigaku/configuration';

/* interface, type, enum, schema imports */
import { Comment, CreateCommentPayload, ErrorDetail } from '@daigaku/common-types';

/**
 * Defines the possible error field names in the {@link useSubmitComment} custom hook.
 */
type NewCommentFormErrorField = 'comment';

/**
 * Manages the comment submission process, including the server request, error handling, and post-success actions.
 *
 * @param setError The `react-hook-form` method to set form errors.
 * @param applicationUuid The application record's uuid string to which the comment belongs to.
 * @return {UseMutationResult<Comment, UnauthorizedError | FormValidationError | ServerError | UnexpectedError,
 *   CreateCommentPayload>}
 */
export const useSubmitComment = (
  setError: UseFormSetError<CreateCommentPayload>,
  applicationUuid: string,
): UseMutationResult<
  Comment,
  UnauthorizedError | FormValidationError | ServerError | UnexpectedError,
  CreateCommentPayload
> => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { createToast } = useToastContext();

  return useMutation({
    mutationKey: [mutationKeys.comment.POST_BY_APPLICATION_UUID],
    mutationFn: (formData: CreateCommentPayload) =>
      commentService.postCommentByApplicationUuid(formData, applicationUuid),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.comments.GET_ALL_BY_APPLICATION_UUID_AND_PAGINATION, applicationUuid],
      });

      createToast({
        title: t('genericSuccessToastTitle'),
        description: t('resetPasswordRegistrationFormSubmissionToastDescription'),
        variantIntent: 'success',
      });
    },
    onError: (error: UnauthorizedError | FormValidationError | ServerError | UnexpectedError) => {
      if (error instanceof FormValidationError) {
        error.coreError?.errors.forEach((errorDetail: ErrorDetail) => {
          if (errorDetail.fieldName) {
            setError(errorDetail.fieldName as NewCommentFormErrorField, { message: errorDetail.errorMessage });
          }
        });
      }
    },
  });
};
