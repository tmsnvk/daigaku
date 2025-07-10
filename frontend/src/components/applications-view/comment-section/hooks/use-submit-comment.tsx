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
import { ConstraintViolationError, CoreApiError, MethodArgumentNotValidError } from '@daigaku/errors';
import { useToastProvider } from '@daigaku/providers';
import { commentService } from '@daigaku/services';
import { CreateCommentSchemaKey } from '../schema.ts';

/* configuration, constants imports */
import { mutationKeys, queryKeys } from '@daigaku/constants';

/* interface, type imports */
import { ApplicationCommentResponse, CreateApplicationCommentPayload, InputViolation } from '@daigaku/common-types';

/**
 * Manages the comment submission process, including the server request, error handling, and post-success actions.
 *
 * @param setError The `react-hook-form` method to set form errors.
 * @param applicationUuid The application record's uuid string to which the comment belongs to.
 * @param resetForm
 * @return {UseMutationResult<ApplicationCommentResponse, CoreApiError, CreateApplicationCommentPayload>}
 */
export const useSubmitComment = (
  applicationUuid: string,
  setError: UseFormSetError<CreateApplicationCommentPayload>,
  resetForm: () => void,
): UseMutationResult<ApplicationCommentResponse, CoreApiError, CreateApplicationCommentPayload> => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { createToast } = useToastProvider();

  return useMutation({
    mutationKey: [mutationKeys.comment.POST_BY_APPLICATION_UUID],
    mutationFn: (formData: CreateApplicationCommentPayload) => {
      return commentService.createByApplicationUuid(formData, applicationUuid);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.comments.GET_ALL_BY_APPLICATION_UUID_AND_PAGINATION, applicationUuid],
      });

      resetForm();

      createToast({
        title: t('genericSuccessToastTitle'),
        description: t('createCommentFormSubmissionToastDescription'),
        variantIntent: 'success',
      });
    },
    onError: (error: CoreApiError) => {
      if (error instanceof MethodArgumentNotValidError || error instanceof ConstraintViolationError) {
        error.coreError?.errors.forEach((errorDetail: InputViolation) => {
          if (errorDetail.fieldName) {
            setError(errorDetail.fieldName as CreateCommentSchemaKey, { message: errorDetail.errorMessage });
          }
        });
      }
    },
  });
};
