import {
  Article,
  ErrorContainer,
} from './comments.styles';

import { errorMessage } from './comments.utilities';

import { Comment } from '@services/comment/comment.service';

interface ComponentProps {
  readonly data: Array<Comment>;
  readonly isError: boolean;
}

const Comments = ({ data, isError }: ComponentProps) => {
  return (
    isError ?
      <ErrorContainer>{errorMessage}</ErrorContainer> :
      <Article>
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
      </Article>
  );
};

export default Comments;
