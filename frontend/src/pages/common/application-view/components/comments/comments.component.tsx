/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* configuration, utilities, constants imports */
import { localization as l } from '@constants';

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
   * The boolean value indicating if an error occurred while fetching the comments.
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
    return (
      <article className={'w-[75%] mx-auto my-[5rem] text-center text-2xl text-(--color-coral-red) font-extrabold'}>
        {l.PAGES.COMMON.APPLICATION_VIEW.COMMENTS.ERROR}
      </article>
    );
  }

  return (
    <article className={'mb-[5rem]'}>
      {comments.map((comment: Comment) => (
        <article
          key={comment.uuid}
          className={'w-[75%] mx-auto my-[5rem] text-xl'}
        >
          <div
            className={
              'px-[1.5rem] py-[2rem] bg-(--color-columbia-blue) border-[0.2rem] border-solid border-(--color-dark-gun-metal) rounded-(--default-border-radius)'
            }
          >
            <p className={'font-extrabold'}>{comment.createdBy}</p>
            <p className={'my-[2rem] whitespace-pre-wrap break-all'}>{comment.comment}</p>
          </div>
          <p className={'pt-[1.5rem] pl-[2.5rem] font-extrabold'}>
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
