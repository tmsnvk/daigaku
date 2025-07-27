/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseMutationResult } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

/* logic imports */
import { CoreApiError } from '@daigaku/errors';
import { useCoreApiMutation, useCoreQueryClient } from '@daigaku/hooks';
import { useToastProvider } from '@daigaku/providers';
import { commentService } from '@daigaku/services';
import { apiClient } from '@daigaku/utilities';

/* configuration, constants imports */
import { mutationKeys, queryKeys } from '@daigaku/constants';

/* interface, type imports */
import { ApplicationCommentResponse, CreateApplicationCommentPayload } from '@daigaku/common-types';

/**
 * Manages the comment submission process, including the server request, error handling, and post-success actions.
 *
 * @param setError The `react-hook-form` method to set form errors.
 * @param applicationUuid The application record's uuid string to which the comment belongs to.
 * @param resetForm
 * @return {UseMutationResult<ApplicationCommentResponse, CoreApiError, CreateApplicationCommentPayload>}
 */
export const useCreateCommentForm = (
  applicationUuid: string,
  setError: UseFormSetError<CreateApplicationCommentPayload>,
  resetForm: () => void,
): UseMutationResult<ApplicationCommentResponse, CoreApiError, CreateApplicationCommentPayload> => {
  const { t } = useTranslation();

  const queryClient = useCoreQueryClient();
  const { createToast } = useToastProvider();

  return useCoreApiMutation(
    [mutationKeys.comment.POST_BY_APPLICATION_UUID],
    (formData: CreateApplicationCommentPayload) => commentService.createByApplicationUuid(applicationUuid, formData),
    {
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
        apiClient.errorWrapper(error, setError);
      },
    },
  );
};
