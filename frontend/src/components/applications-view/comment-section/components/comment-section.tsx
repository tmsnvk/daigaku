/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { useTranslation } from 'react-i18next';

/* logic imports */
import { joinTw } from '@daigaku/utilities';
import { useCommentPagination } from '../hooks/use-comment-pagination.tsx';
import { useGetCommentsByApplicationAndPagination } from '../hooks/use-get-comments-by-application-and-pagination.tsx';

/* component imports */
import { CommentPaginationButton } from './comment-pagination-button.tsx';
import { Comments } from './comments.tsx';
import { CreateCommentForm } from './create-comment-form.tsx';

/* interface, type imports */
import { ApplicationCommentPaginationDataResponse } from '@daigaku/common-types';

/**
 * Defines the component's properties.
 */
interface CommentSectionProps {
  /**
   * The application's uuid string to which the comment section belongs to.
   */
  readonly applicationUuid: string;

  /**
   *
   */
  readonly comments: ApplicationCommentPaginationDataResponse;
}

/**
 * Renders the comment section on an application record's view page.
 *
 * @param {CommentSectionProps} props
 * @return {JSX.Element}
 */
export const CommentSection = ({ applicationUuid, comments }: CommentSectionProps): JSX.Element => {
  const { t } = useTranslation();

  const { currentPage, goToPreviousPage, goToNextPage } = useCommentPagination();
  const { data, isError } = useGetCommentsByApplicationAndPagination(applicationUuid, currentPage);

  return (
    <section className={joinTw('mx-auto my-20 w-[95%]', 'sm:w-[65%] lg:w-[95%]')}>
      <Comments
        comments={data?.comments ?? comments.comments}
        isError={isError}
      />
      <div className={'mx-auto mb-20 flex w-[90%] flex-row items-center justify-around'}>
        <CommentPaginationButton
          disabled={data?.currentPage === 0}
          value={t('app.page.applicationView.comment.previousPage')}
          onClick={goToPreviousPage}
        />
        <span className={'text-xl'}>
          {t('app.page.applicationView.comment.page')} {currentPage + 1}
        </span>
        <CommentPaginationButton
          disabled={currentPage + 1 === data?.totalPages || (currentPage === 0 && data?.totalComments === 0)}
          value={t('app.page.applicationView.comment.nextPage')}
          onClick={() => {
            if (data?.totalPages) {
              goToNextPage(data.totalPages);
            }
          }}
        />
      </div>
      <CreateCommentForm applicationUuid={applicationUuid} />
    </section>
  );
};
