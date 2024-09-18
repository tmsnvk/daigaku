/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
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

/* interfaces, types, enums */
interface ComponentProps {
  readonly comments: Array<Comment>;
  readonly isError: boolean;
}

/**
 * @description
 * The component renders the comments on the selected pagination page.
 *
 * @param {Array<Comment>} props.comments
 * The list of comments.
 * @param {boolean} props.isError
 * A boolean value signaling whether there was an error while fetching the comments.
 *
 * @returns {JSX.Element}
 *
 * @since 0.0.1
 */
export const Comments = ({ comments, isError }: ComponentProps): JSX.Element => {
  return isError ? (
    <ErrorContainer>{constants.ui.error}</ErrorContainer>
  ) : (
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
