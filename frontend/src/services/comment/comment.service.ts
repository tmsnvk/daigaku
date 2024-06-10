import { NewCommentFormFieldsT } from '@pages/shared/Application/components/NewCommentBox/NewCommentBox.hooks.tsx';
import { axiosConfigWithAuth } from '@configuration';

export type CommentT = {
  uuid: string;
  content: string;
  // numberOfLikes: number;
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
