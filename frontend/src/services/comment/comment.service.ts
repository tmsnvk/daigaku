/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* configuration, utilities, constants imports */
import { axiosConfigWithAuth } from '@daigaku/configuration';
import { apiClientWrapper } from '@daigaku/utilities';

/* interface, type, enum, schema imports */
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
   *
   * @throws {FormValidationError} If the server returns field-level validation errors.
   * @throws {ServerError} If the server fails unexpectedly.
   * @throws {UnexpectedError} For any non-Axios or unrecognized error.
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
   *
   * @throws {FormValidationError} If the server returns field-level validation errors.
   * @throws {ServerError} If the server fails unexpectedly.
   * @throws {UnexpectedError} For any non-Axios or unrecognized error.
   */
  postCommentByApplicationUuid: (formData: CreateCommentPayload, applicationUuid: string) => Promise<Comment>;
}

/**
 * Manages comment-related REST API operations, implementing {@link CommentService}.
 */
export const commentService: CommentService = {
  getAllByApplicationUuidAndPagination: (
    applicationUuid: string,
    currentPage: number,
  ): Promise<CommentPaginationDataResponse> => {
    return apiClientWrapper(() =>
      axiosConfigWithAuth.request<CommentPaginationDataResponse>({
        method: 'GET',
        url: `/api/v1/comments/${applicationUuid}?page=${currentPage}`,
      }));
  },
  postCommentByApplicationUuid: (formData: CreateCommentPayload, applicationUuid: string): Promise<Comment> => {
    return apiClientWrapper(() =>
      axiosConfigWithAuth.request<Comment>({
        method: 'POST',
        url: `/api/v1/comments/${applicationUuid}`,
        data: formData,
      }));
  },
};
