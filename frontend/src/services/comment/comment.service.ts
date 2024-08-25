/**
 * @prettier
 */

import { axiosConfigWithAuth } from '@configuration';

import { NewCommentFormFields } from '@pages/common/application-view/components/new-comment-box/new-comment-box.hooks';

export interface Comment {
  readonly uuid: string;
  readonly content: string;
  readonly createdAt: number;
  readonly lastUpdatedAt: number;
  readonly createdBy: string;
  readonly lastModifiedBy: string;
}

export interface CommentMeta {
  readonly currentPage: number;
  readonly totalComments: number;
  readonly totalPages: number;
  readonly comments: Array<Comment>;
}

export const commentService = {
  getAllByApplicationUUid: async (applicationUuid: string, currentPage: number): Promise<CommentMeta> => {
    const { data } = await axiosConfigWithAuth.request<CommentMeta>({
      method: 'GET',
      url: `/api/v1/comments/${applicationUuid}?page=${currentPage}`,
    });

    return data;
  },
  postComment: async (formData: NewCommentFormFields, applicationUuid: string): Promise<Comment> => {
    const { data } = await axiosConfigWithAuth.request<Comment>({
      method: 'POST',
      url: `/api/v1/comments/${applicationUuid}`,
      data: formData,
    });

    return data;
  },
};
