/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { useTranslation } from 'react-i18next';

/* configuration, utilities, constants imports */
import { joinTw } from '@daigaku/utilities';

/* interface, type, enum imports */
import { Comment } from '@daigaku/common-types';

/**
 * Defines the component's properties.
 */
interface CommentsProps {
  /**
   * The list of comments to be displayed.
   */
  readonly comments: Array<Comment>;

  /**
   * The boolean value indicating if an error occurred while fetching the comments.
   */
  readonly isError: boolean;
}

/**
 * Renders the comments on the selected pagination page.
 *
 * @param {CommentsProps} props
 * @return {JSX.Element}
 */
export const Comments = ({ comments, isError }: CommentsProps): JSX.Element => {
  const { t } = useTranslation();

  if (isError) {
    return (
      <article
        className={joinTw('text-center', 'w-[75%]', 'mx-auto my-10', 'text-destructive text-2xl font-extrabold')}
      >
        {t('unexpectedError')}
      </article>
    );
  }

  return (
    <article>
      {comments.map((comment: Comment) => (
        <article
          key={comment.uuid}
          className={joinTw('w-[75%]', 'mx-auto my-20', 'text-xl')}
        >
          <div className={joinTw('p-8', 'bg-tertiary border-secondary border-2', 'rounded-(--default-border-radius)')}>
            <p className={joinTw('font-extrabold')}>{comment.createdBy}</p>
            <p className={joinTw('my-4', 'whitespace-pre-wrap break-all')}>{comment.comment}</p>
          </div>
          <p className={joinTw('pl-10 pt-6', 'font-extrabold')}>
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
    </article>
  );
};
