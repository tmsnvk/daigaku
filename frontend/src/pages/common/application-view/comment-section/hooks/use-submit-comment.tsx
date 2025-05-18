/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { UseFormSetError } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

/* logic imports */
import { commentService } from '@daigaku/services';

/* configuration, utilities, constants imports */
import { mutationKeys, queryClient, queryKeys } from '@daigaku/configuration';

/* interface, type, enum, schema imports */
import { Comment, CoreErrorResponse, CreateCommentPayload, ErrorDetail } from '@daigaku/common-types';

/**
 * Defines the possible error field names in the {@link useSubmitComment} custom hook.
 */
type NewCommentFormErrorT = 'root' | 'comment';

/**
 * Manages the comment submission process, including the server request, error handling, and post-success actions.
 *
 * @param setError The `react-hook-form` method to set form errors.
 * @param applicationUuid The application record's uuid string to which the comment belongs to.
 * @return {UseMutationResult<Comment, AxiosError<CoreErrorResponse>, CreateCommentPayload>}
 */
export const useSubmitComment = (
  setError: UseFormSetError<CreateCommentPayload>,
  applicationUuid: string,
): UseMutationResult<Comment, AxiosError<CoreErrorResponse>, CreateCommentPayload> => {
  const { t } = useTranslation();

  return useMutation({
    mutationKey: [mutationKeys.comment.POST_BY_APPLICATION_UUID],
    mutationFn: (formData: CreateCommentPayload) =>
      commentService.postCommentByApplicationUuid(formData, applicationUuid),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.comments.GET_ALL_BY_APPLICATION_UUID_AND_PAGINATION, applicationUuid],
      });
    },
    onError: (error: AxiosError<CoreErrorResponse>) => {
      if (axios.isAxiosError(error)) {
        const status: number | undefined = error.response?.data.errorCode;
        const errors: CoreErrorResponse | undefined = error.response?.data;

        if (status) {
          if (status === 400 && errors) {
            errors.errors.forEach((error: ErrorDetail) => {
              if (error.fieldName) {
                setError(error.fieldName as NewCommentFormErrorT, { message: error.errorMessage });
              }
            });
          } else if (status >= 500) {
            setError('root', { message: t('unexpectedServerError') });
          }
        }
      } else {
        setError('root', { message: t('unexpectedServerError') });
      }
    },
  });
};
