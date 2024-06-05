import { ContainerArticle } from './Comments.styles.ts';
import { CommentT } from '@services/comment/comment.service.ts';

type ComponentPropsT = {
  data: CommentT[];
}

const Comments = ({ data }: ComponentPropsT) => {
  return (
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
