/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

/* component, style imports */
import { Article, ErrorContainer } from './comments.styles';

/* configuration, utilities, constants imports */
import { constants } from './comments.constants';

/* interface, type, enum imports */
import { Comment } from '@common-types';

/**
 * ===============
 * Component {@link Comments}
 * ===============
 */

/**
 * Defines the properties of the {@link Comments} component.
 *
 * @since 0.0.1
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
 *
 * @since 0.0.1
 */
export const Comments = ({ comments, isError }: ComponentProps): JSX.Element => {
  if (isError) {
    return <ErrorContainer>{constants.ui.error}</ErrorContainer>;
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
