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
import { Comment, MutationResult, ServerValidationErrorResponse } from '@common-types';

/**
 * ===============
 * Custom Hook {@link useSubmitNewComment}
 * ===============
 */

/* interfaces, types, enums */
export interface NewCommentFormFields {
  readonly comment: string;
}

type NewCommentForm = {
  setError: UseFormSetError<NewCommentFormFields>;
  applicationUuid: string;
};

type NewCommentFormErrorT = 'root' | 'comment';

export type SubmitNewComment = MutationResult<Comment, AxiosError<Array<ServerValidationErrorResponse>>, NewCommentFormFields>;

/**
 * @description
 * The custom hook manages the {@link NewCommentForm} submission process, including REST API request, error handling, and post-success actions.
 *
 * @param {UseFormSetError<NewCommentFormFields>} params.setError
 * A `react-hook-form` function to set form errors.
 * @param {string} params.applicationUuid
 * The UUID of the application to which the comment belongs to.
 *
 * @returns {SubmitNewComment}
 * A `react-query` mutation object.
 *
 * @since 0.0.1
 */
export const useSubmitNewComment = ({ setError, applicationUuid }: NewCommentForm): SubmitNewComment => {
  return useMutation({
    mutationKey: [mutationKeys.comment.POST_BY_APPLICATION_UUID],
    mutationFn: (formData: NewCommentFormFields) => commentService.postCommentByApplicationUuid(formData, applicationUuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.comments.GET_ALL_BY_APPLICATION_UUID_AND_PAGINATION, applicationUuid] });
    },
    onError: (error: AxiosError<Array<ServerValidationErrorResponse>>) => {
      if (axios.isAxiosError(error)) {
        const status: number | undefined = error.response?.status;
        const errors: Array<ServerValidationErrorResponse> | undefined = error.response?.data;

        if (status) {
          if (status === 400 && errors) {
            errors.forEach((error: ServerValidationErrorResponse) => {
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
