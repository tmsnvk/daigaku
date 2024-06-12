import {
  ContainerArticle,
  ErrorContainer,
} from './Comments.styles.ts';
import { CommentT } from '@services/comment/comment.service.ts';
import { errorMessage } from './Comments.utilities.ts';

type ComponentPropsT = {
  data: CommentT[];
  isError: boolean;
}

const Comments = ({ data, isError }: ComponentPropsT) => {
  return (
    isError ?
      <ErrorContainer>{errorMessage}</ErrorContainer> :
      <ContainerArticle>
        {data.map((comment) => (
          <article key={comment.uuid}>
            <div>
              <p>{comment.createdBy}</p>
              <p>{comment.content}</p>
            </div>
            <p>{new Date(comment.createdAt).toLocaleString(
              'en-GB', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              },
            )}</p>
          </article>
        ))}
    </ContainerArticle>
  );
};

export default Comments;
