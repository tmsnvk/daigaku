/**
 * @prettier
 */

/* component, style imports */
import { Article, ErrorContainer } from './comments.styles';

/* utilities imports */
import { errorMessage } from './comments.utilities';

/* interface, type, enum imports */
import { Comment } from '@services/comment/comment.service';

/* interfaces, types, enums */
interface ComponentProps {
  readonly comments: Array<Comment>;
  readonly isError: boolean;
}

/*
 * component - TODO - add functionality description
 */
export const Comments = ({ comments, isError }: ComponentProps) => {
  return isError ? (
    <ErrorContainer>{errorMessage}</ErrorContainer>
  ) : (
    <Article>
      {comments.map((comment: Comment) => (
        <article key={comment.uuid}>
          <div>
            <p>{comment.createdBy}</p>
            <p>{comment.content}</p>
          </div>
          <p>
            {new Date(comment.createdAt).toLocaleString('en-GB', {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </article>
      ))}
    </Article>
  );
};
