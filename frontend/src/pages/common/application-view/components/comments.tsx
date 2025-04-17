/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* configuration, utilities, constants imports */
import { localization as l } from '@daigaku/constants';

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
  if (isError) {
    return (
      <article className={'text-destructive mx-auto my-10 w-[75%] text-center text-2xl font-extrabold'}>
        {l.PAGES.COMMON.APPLICATION_VIEW.COMMENTS.ERROR}
      </article>
    );
  }

  return (
    <article>
      {comments.map((comment: Comment) => (
        <article
          key={comment.uuid}
          className={'mx-auto my-20 w-[75%] text-xl'}
        >
          <div className={'bg-tertiary border-secondary rounded-(--default-border-radius) border-2 border-solid p-8'}>
            <p className={'font-extrabold'}>{comment.createdBy}</p>
            <p className={'my-4 whitespace-pre-wrap break-all'}>{comment.comment}</p>
          </div>
          <p className={'pl-10 pt-6 font-extrabold'}>
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
