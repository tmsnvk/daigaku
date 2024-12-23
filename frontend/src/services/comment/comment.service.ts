/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { AxiosResponse } from 'axios';

/* configuration, utilities, constants imports */
import { axiosConfigWithAuth } from '@configuration';

/* interface, type, enum imports */
import { Comment, CommentPaginationData, NewCommentFormFields } from '@common-types';

/**
 * Defines the operations of the {@link commentService} object, responsible for managing comment-related API requests.
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
