/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* logic imports */
import { apiClient } from 'utilities/api-client';

/* configuration, constants imports */
import { axiosConfigWithAuth } from '@daigaku/configuration';

/* interface, type imports */
import {
  ApplicationCommentPaginationDataResponse,
  ApplicationCommentResponse,
  CreateApplicationCommentPayload,
} from '@daigaku/common-types';

/**
 * Defines comment-related operations, handling API requests and interactions for comment management.
 */
interface CommentService {
  /**
   * Retrieves a paginated list of comments for a specific application.
   *
   * @param applicationUuid The selected application's uuid.
   * @param currentPage The current page number for pagination.
   * @return {Promise<Array<ApplicationCommentPaginationDataResponse>>}
   *
   * @throws {UnauthorizedError} If the user enters incorrect form data, i.e., an email/password pair do not match or
   *   the user does not have a valid token.
   * @throws {ServerError} If the server fails unexpectedly.
   * @throws {UnexpectedError} For any non-Axios or unrecognized error.
   */
  getAllByApplicationUuidAndPage: (
    applicationUuid: string,
    currentPage: number,
  ) => Promise<ApplicationCommentPaginationDataResponse>;

  /**
   * Posts a new comment for a specific application.
   *
   * @param applicationUuid The selected application's uuid.
   * @param formData The new comment form's data object.
   * @return {Promise<ApplicationCommentResponse>}
   *
   * @throws {UnauthorizedError} If the user enters incorrect form data, i.e., an email/password pair do not match or
   *   the user does not have a valid token.
   * @throws {FormValidationError} If the server returns field-level validation errors.
   * @throws {ServerError} If the server fails unexpectedly.
   * @throws {UnexpectedError} For any non-Axios or unrecognized error.
   */
  createByApplicationUuid: (
    applicationUuid: string,
    formData: CreateApplicationCommentPayload,
  ) => Promise<ApplicationCommentResponse>;
}

/**
 * Manages comment-related REST API operations.
 */
export const commentService: CommentService = {
  getAllByApplicationUuidAndPage: (
    applicationUuid: string,
    currentPage: number,
  ): Promise<ApplicationCommentPaginationDataResponse> => {
    return apiClient.serviceWrapper(() =>
      axiosConfigWithAuth.request<ApplicationCommentPaginationDataResponse>({
        method: 'GET',
        url: `/api/v1/comments`,
        params: {
          applicationUuid,
          page: currentPage,
        },
      }),
    );
  },
  createByApplicationUuid: (
    applicationUuid: string,
    formData: CreateApplicationCommentPayload,
  ): Promise<ApplicationCommentResponse> => {
    return apiClient.serviceWrapper(() =>
      axiosConfigWithAuth.request<ApplicationCommentResponse>({
        method: 'POST',
        url: `/api/v1/comments`,
        data: formData,
        params: {
          applicationUuid,
        },
      }),
    );
  },
};
