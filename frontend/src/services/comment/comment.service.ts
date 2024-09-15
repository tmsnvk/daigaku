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
import { NewCommentFormFields } from '@pages/common/application-view/components/new-comment-box/new-comment-box.hooks';

/**
 * ===============
 * Service API Calls {@link commentService}
 * ===============
 */

interface CommentService {
  getAllByApplicationUUidAndPagination: (applicationUuid: string, currentPage: number) => Promise<CommentMeta>;
  postComment: (formData: NewCommentFormFields, applicationUuid: string) => Promise<Comment>;
}

/* interfaces, types, enums */
export interface Comment {
  readonly uuid: string;
  readonly content: string;
  readonly createdAt: number;
  readonly lastUpdatedAt: number;
  readonly createdBy: string;
  readonly lastModifiedBy: string;
}

export interface CommentMeta {
  readonly totalPages: number;
  readonly currentPage: number;
  readonly totalComments: number;
  readonly comments: Array<Comment>;
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
   * @returns {Promise<Array<CommentMeta>>}
   * A promise that resolves when the request is successfully sent.
   *
   * @throws {AxiosError}
   * Throws an error if the request fails.
   *
   * @since 0.0.1
   */
  getAllByApplicationUUidAndPagination: async (applicationUuid: string, currentPage: number): Promise<CommentMeta> => {
    const response: AxiosResponse<CommentMeta> = await axiosConfigWithAuth.request<CommentMeta>({
      method: 'GET',
      url: `/api/v1/comments/${applicationUuid}?page=${currentPage}`,
    });

    return response.data;
  },
  /*
   * TODO - comment
   */
  postComment: async (formData: NewCommentFormFields, applicationUuid: string): Promise<Comment> => {
    const { data } = await axiosConfigWithAuth.request<Comment>({
      method: 'POST',
      url: `/api/v1/comments/${applicationUuid}`,
      data: formData,
    });

    return data;
  },
};
