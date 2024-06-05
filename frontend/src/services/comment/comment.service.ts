import { NewCommentFormFieldsT } from '@pages/shared/Application/components/NewCommentBox/NewCommentBox.hooks.tsx';
import { axiosConfigWithAuth } from '@configuration';

export type CommentT = {
  uuid: string;
  applicationUuid: string;
  accountUuid: string;
  content: string;
  numberOfLikes: number;
  createdAt: Date;
  lastUpdatedAt: Date;
  createdBy: string;
  lastModifiedBy: string;
}

const commentService = {
  getAllByApplicationUUid: async (applicationUuid: string): Promise<CommentT[]> => {
    const { data } = await axiosConfigWithAuth.request<CommentT[]>({
      method: 'GET',
      url: `/api/comments/${applicationUuid}`,
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
