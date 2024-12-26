/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* component, style imports */
import { Article, ErrorContainer } from './comments.styles';

/* configuration, utilities, constants imports */
import { constants } from './comments.constants';

/* interface, type, enum imports */
import { Comment } from '@common-types';

/**
 * Defines the component's properties.
 */
interface ComponentProps {
  /**
   * The list of comments to be displayed.
   */
  readonly comments: Array<Comment>;

  /**
   * A boolean value indicating if an error occurred while fetching the comments.
   */
  readonly isError: boolean;
}

/**
 * Renders the comments on the selected pagination page.
 *
 * @param {ComponentProps} props
 * @return {JSX.Element}
 */
export const Comments = ({ comments, isError }: ComponentProps): JSX.Element => {
  if (isError) {
    return <ErrorContainer>{constants.ui.ERROR}</ErrorContainer>;
  }

  return (
    <Article>
      {comments.map((comment: Comment) => (
        <article key={comment.uuid}>
          <div>
            <p>{comment.createdBy}</p>
            <p>{comment.comment}</p>
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
