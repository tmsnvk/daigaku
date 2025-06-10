/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* configuration, utilities, constants imports */
import { axiosConfigWithAuth } from '@daigaku/configuration';
import { apiClientWrapper } from '@daigaku/utilities';

/* interface, type imports */
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
   * @throws {UnauthorizedError} If the user enters incorrect form data, i.e., an email/password pair do not match or
   *   the user does not have a valid token.
   * @throws {ServerError} If the server fails unexpectedly.
   * @throws {UnexpectedError} For any non-Axios or unrecognized error.
   */
  findPaginatedListByApplicationUuid: (
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
   * @throws {UnauthorizedError} If the user enters incorrect form data, i.e., an email/password pair do not match or
   *   the user does not have a valid token.
   * @throws {FormValidationError} If the server returns field-level validation errors.
   * @throws {ServerError} If the server fails unexpectedly.
   * @throws {UnexpectedError} For any non-Axios or unrecognized error.
   */
  createByApplicationUuid: (formData: CreateCommentPayload, applicationUuid: string) => Promise<Comment>;
}

/**
 * Manages comment-related REST API operations, implementing {@link CommentService}.
 */
export const commentService: CommentService = {
  findPaginatedListByApplicationUuid: (
    applicationUuid: string,
    currentPage: number,
  ): Promise<CommentPaginationDataResponse> => {
    return apiClientWrapper(() =>
      axiosConfigWithAuth.request<CommentPaginationDataResponse>({
        method: 'GET',
        url: `/api/v1/comments/${applicationUuid}?page=${currentPage}`,
      }));
  },
  createByApplicationUuid: (formData: CreateCommentPayload, applicationUuid: string): Promise<Comment> => {
    return apiClientWrapper(() =>
      axiosConfigWithAuth.request<Comment>({
        method: 'POST',
        url: `/api/v1/comments/${applicationUuid}`,
        data: formData,
      }));
  },
};
