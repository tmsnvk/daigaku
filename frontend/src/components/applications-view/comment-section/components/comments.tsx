/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { useTranslation } from 'react-i18next';

/* interface, type imports */
import { ApplicationComment } from '@daigaku/common-types';

/**
 * Defines the component's properties.
 */
interface CommentsProps {
  /**
   * The list of comments to be displayed.
   */
  readonly comments: Array<ApplicationComment>;

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
      <article className={'text-destructive mx-auto my-1 w-[75%] text-center text-2xl font-extrabold'}>
        {t('app.generic.error.unexpectedError')}
      </article>
    );
  }

  return (
    <article>
      {comments.map((comment: ApplicationComment) => (
        <article
          className={'mx-auto my-20 w-[75%] text-xl'}
          key={comment.uuid}
        >
          <div className={'bg-tertiary border-secondary rounded-(--default-border-radius) border-2 p-8'}>
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
