import { axiosConfigWithAuth } from '@configuration';

import { NewCommentFormFieldsT } from '@pages/common/Application/components/NewCommentBox/NewCommentBox.hooks.tsx';

export type CommentT = {
  uuid: string;
  content: string;
  createdAt: number;
  lastUpdatedAt: number;
  createdBy: string;
  lastModifiedBy: string;
}

export type CommentMetaT = {
  currentPage: number;
  totalComments: number;
  totalPages: number;
  comments: CommentT[];
}

const commentService = {
  getAllByApplicationUUid: async (applicationUuid: string, currentPage: number): Promise<CommentMetaT> => {
    const { data } = await axiosConfigWithAuth.request<CommentMetaT>({
      method: 'GET',
      url: `/api/comments/${applicationUuid}?page=${currentPage}`,
    });

    return data;
  },
  postComment: async (formData: NewCommentFormFieldsT, applicationUuid: string): Promise<CommentT> => {
    const { data } = await axiosConfigWithAuth.request<CommentT>({
      method: 'POST',
      url: `/api/comments/${applicationUuid}`,
      data: formData,
    });

    return data;
  },
};

export default commentService;
