/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 */

/* external imports */
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { UseFormSetError } from 'react-hook-form';

/* logic imports */
import { commentService } from '@services/index';

/* configuration, utilities, constants imports */
import { mutationKeys, queryClient, queryKeys } from '@configuration';
import { UNEXPECTED_GLOBAL_ERROR, UNEXPECTED_SERVER_ERROR } from '@constants';

/* interface, type, enum imports */
import { Comment, DefaultErrorResponse, ErrorDetail, MutationResult } from '@common-types';

/**
 * ===============
 * Custom Hook {@link useSubmitNewComment}
 * ===============
 */

/**
 * Defines the structure of the form fields for submitting a new comment.
 *
 * @since 0.0.1
 */
export interface NewCommentFormFields {
  readonly comment: string;
}

/**
 * Defines the possible error field names in the {@link useSubmitNewComment} custom hook.
 *
 * @since 0.0.1
 */
type NewCommentFormErrorT = 'root' | 'comment';

/**
 * Defines the return value properties of the {@link useSubmitNewComment} custom hook.
 *
 * @since 0.0.1
 */
export type SubmitNewComment = MutationResult<Comment, AxiosError<DefaultErrorResponse>, NewCommentFormFields>;

/**
 * Mnages the comment submission process, including REST API request, error handling, and post-success actions.
 *
 * @param setError A `react-hook-form` function to set form errors.
 * @param applicationUuid The uuid of the application to which the comment belongs to.
 * @return {SubmitNewComment}
 *
 * @since 0.0.1
 */
export const useSubmitNewComment = (setError: UseFormSetError<NewCommentFormFields>, applicationUuid: string): SubmitNewComment => {
  return useMutation({
    mutationKey: [mutationKeys.comment.POST_BY_APPLICATION_UUID],
    mutationFn: (formData: NewCommentFormFields) => commentService.postCommentByApplicationUuid(formData, applicationUuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.comments.GET_ALL_BY_APPLICATION_UUID_AND_PAGINATION, applicationUuid] });
    },
    onError: (error: AxiosError<DefaultErrorResponse>) => {
      if (axios.isAxiosError(error)) {
        const status: number | undefined = error.response?.data.errorCode;
        const errors: DefaultErrorResponse | undefined = error.response?.data;

        if (status) {
          if (status === 400 && errors) {
            errors.errors.forEach((error: ErrorDetail) => {
              if (error.fieldName) {
                setError(error.fieldName as NewCommentFormErrorT, { message: error.errorMessage });
              }
            });
          } else if (status >= 500) {
            setError('root', { message: UNEXPECTED_SERVER_ERROR });
          }
        }
      } else {
        setError('root', { message: UNEXPECTED_GLOBAL_ERROR });
      }
    },
  });
};
