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
import { AxiosResponse } from 'axios';

/* configuration, utilities, constants imports */
import { axiosConfigWithAuth } from '@configuration';

/* interface, type, enum imports */
import { Comment, CommentPaginationData } from '@common-types';
import { NewCommentFormFields } from '@pages/common/application-view/components/new-comment-form/new-comment-form.hooks';

/**
 * ===============
 * Service API Calls {@link commentService}
 * ===============
 */

interface CommentService {
  getAllByApplicationUUidAndPagination: (applicationUuid: string, currentPage: number) => Promise<CommentPaginationData>;
  postCommentByApplicationUuid: (formData: NewCommentFormFields, applicationUuid: string) => Promise<Comment>;
}

export const commentService: CommentService = {
  /**
   * @description
   * The method sends a GET request to fetch a list of Application objects based on the user's authorisation.
   *
   * @param {string} applicationUuid
   * The selected application's UUID.
   * @param {number} currentPage
   * The current page number for pagination.
   *
   * @returns {Promise<Array<CommentPaginationData>>}
   * A promise that resolves when the request is successfully sent.
   *
   * @throws {AxiosError}
   * Throws an error if the request fails.
   *
   * @since 0.0.1
   */
  getAllByApplicationUUidAndPagination: async (applicationUuid: string, currentPage: number): Promise<CommentPaginationData> => {
    const response: AxiosResponse<CommentPaginationData> = await axiosConfigWithAuth.request<CommentPaginationData>({
      method: 'GET',
      url: `/api/v1/comments/${applicationUuid}?page=${currentPage}`,
    });

    return response.data;
  },
  /**
   * @description
   * The method sends a POST request with the provided {@link NewCommentForm} data.
   *
   * @param {NewCommentFormFields} formData
   * The new comment form's data object.
   * @param {string} applicationUuid
   * The selected application's UUID.
   *
   * @returns {Promise<Comment>}
   * A promise that resolves when the request is successfully sent.
   *
   * @throws {AxiosError}
   * Throws an error if the request fails.
   *
   * @since 0.0.1
   */
  postCommentByApplicationUuid: async (formData: NewCommentFormFields, applicationUuid: string): Promise<Comment> => {
    const response: AxiosResponse<Comment> = await axiosConfigWithAuth.request<Comment>({
      method: 'POST',
      url: `/api/v1/comments/${applicationUuid}`,
      data: formData,
    });

    return response.data;
  },
};
