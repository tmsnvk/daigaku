/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { AxiosResponse } from 'axios';

/* configuration, utilities, constants imports */
import { axiosConfigWithAuth } from '@daigaku/configuration';

/* interface, type, enum imports */
import { Comment, CommentPaginationDataResponse, CreateCommentPayload } from '@daigaku/common-types';

/**
 * Defines comment-related operations, handling API requests and interactions for comment management.
 */
interface CommentService {
  /**
   * Retrieves a paginated list of comments for a specific application.
   *
   * @param applicationUuid The selected application's uuid.
   * @param currentPage The current page number for pagination.
   * @return {Promise<Array<CommentPaginationDataResponse>>}
   * @throws {AxiosError}
   */
  getAllByApplicationUuidAndPagination: (
    applicationUuid: string,
    currentPage: number,
  ) => Promise<CommentPaginationDataResponse>;

  /**
   * Posts a new comment for a specific application.
   *
   * @param formData The new comment form's data object.
   * @param applicationUuid The selected application's uuid.
   * @return {Promise<Comment>}
   * @throws {AxiosError}
   */
  postCommentByApplicationUuid: (formData: CreateCommentPayload, applicationUuid: string) => Promise<Comment>;
}

/**
 * Manages comment-related REST API operations, implementing {@link CommentService}.
 */
export const commentService: CommentService = {
  getAllByApplicationUuidAndPagination: async (
    applicationUuid: string,
    currentPage: number,
  ): Promise<CommentPaginationDataResponse> => {
    const response: AxiosResponse<CommentPaginationDataResponse> =
      await axiosConfigWithAuth.request<CommentPaginationDataResponse>({
        method: 'GET',
        url: `/api/v1/comments/${applicationUuid}?page=${currentPage}`,
      });

    return response.data;
  },
  postCommentByApplicationUuid: async (formData: CreateCommentPayload, applicationUuid: string): Promise<Comment> => {
    const response: AxiosResponse<Comment> = await axiosConfigWithAuth.request<Comment>({
      method: 'POST',
      url: `/api/v1/comments/${applicationUuid}`,
      data: formData,
    });

    return response.data;
  },
};
