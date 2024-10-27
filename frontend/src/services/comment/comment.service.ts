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

/**
 * Defines the operations of the {@link commentService} object, responsible for managing comment-related API requests.
 *
 * @since 0.0.1
 */
interface CommentService {
  /**
   * Retrieves a paginated list of comments for a specific application.
   *
   * @param applicationUuid The selected application's uuid.
   * @param currentPage The current page number for pagination.
   * @return {Promise<Array<CommentPaginationData>>}
   * @throws {AxiosError}
   */
  getAllByApplicationUuidAndPagination: (applicationUuid: string, currentPage: number) => Promise<CommentPaginationData>;

  /**
   * Posts a new comment for a specific application.
   *
   * @param formData The new comment form's data object.
   * @param applicationUuid The selected application's uuid.
   * @return {Promise<Comment>}
   * @throws {AxiosError}
   */
  postCommentByApplicationUuid: (formData: NewCommentFormFields, applicationUuid: string) => Promise<Comment>;
}

/**
 * Manages comment-related REST API operations, implementing {@link CommentService}.
 *
 * @since 0.0.1
 */
export const commentService: CommentService = {
  getAllByApplicationUuidAndPagination: async (applicationUuid: string, currentPage: number): Promise<CommentPaginationData> => {
    const response: AxiosResponse<CommentPaginationData> = await axiosConfigWithAuth.request<CommentPaginationData>({
      method: 'GET',
      url: `/api/v1/comments/${applicationUuid}?page=${currentPage}`,
    });

    return response.data;
  },
  postCommentByApplicationUuid: async (formData: NewCommentFormFields, applicationUuid: string): Promise<Comment> => {
    const response: AxiosResponse<Comment> = await axiosConfigWithAuth.request<Comment>({
      method: 'POST',
      url: `/api/v1/comments/${applicationUuid}`,
      data: formData,
    });

    return response.data;
  },
};
